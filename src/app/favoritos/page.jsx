"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './favoritos.module.css';

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Função para verificar se é uma URL válida de imagem
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    // Verifica se é uma URL válida
    try {
      new URL(url);
      return url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) || 
             url.includes('flagcdn.com') || 
             url.includes('localhost:5000') ||
             url.startsWith('/image');
    } catch {
      return false;
    }
  };

  // Função para renderizar a bandeira do país
  const renderCountryFlag = (country) => {
    console.log(`🏁 [FAVORITOS] Renderizando bandeira para: ${country.name}`, country.flag);
    
    // Se o flag é uma URL válida de imagem, renderiza como img
    if (isValidImageUrl(country.flag)) {
      console.log(`🖼️ [FAVORITOS] Flag é URL válida: ${country.flag}`);
      return (
        <img 
          src={country.flag} 
          alt={`Bandeira de ${country.name}`}
          className={styles.flagIcon}
          onError={(e) => {
            console.log(`❌ [FAVORITOS] Erro ao carregar bandeira: ${e.target.src}`);
            
            // Tenta fallback com flagcdn.com
            if (!e.target.src.includes('flagcdn.com')) {
              const countryCode = getCountryCode(country.name);
              e.target.src = `https://flagcdn.com/w320/${countryCode}.png`;
              console.log(`🔄 [FAVORITOS] Tentando fallback: ${e.target.src}`);
            } else {
              // Se fallback também falhou, remove a imagem e mostra emoji
              e.target.style.display = 'none';
              const fallbackDiv = document.createElement('div');
              fallbackDiv.className = styles.flagIcon;
              fallbackDiv.textContent = getCountryEmoji(country.name);
              e.target.parentNode.insertBefore(fallbackDiv, e.target);
              console.log(`🚫 [FAVORITOS] Usando emoji fallback: ${getCountryEmoji(country.name)}`);
            }
          }}
          onLoad={() => {
            console.log(`✅ [FAVORITOS] Bandeira carregada com sucesso: ${country.flag}`);
          }}
        />
      );
    } else {
      // Se não é URL, trata como emoji ou texto
      console.log(`🔤 [FAVORITOS] Flag é emoji/texto: ${country.flag}`);
      return (
        <div className={styles.flagIcon}>
          {country.flag || getCountryEmoji(country.name)}
        </div>
      );
    }
  };

  // Função para obter código do país (simplificado)
  const getCountryCode = (countryName) => {
    const codes = {
      'Estados Unidos': 'us',
      'United States': 'us',
      'USA': 'us',
      'França': 'fr',
      'France': 'fr',
      'Brasil': 'br',
      'Brazil': 'br',
    };
    return codes[countryName] || countryName.toLowerCase().substring(0, 2);
  };

  // Função para obter emoji do país
  const getCountryEmoji = (countryName) => {
    const emojis = {
      'Estados Unidos': '🇺🇸',
      'United States': '🇺🇸',
      'USA': '🇺🇸',
      'França': '🇫🇷',
      'France': '🇫🇷',
      'Brasil': '🇧🇷',
      'Brazil': '🇧🇷',
    };
    return emojis[countryName] || '🏳️';
  };

  // Função para obter a URL da imagem do país
  const getCountryImage = (country) => {
    console.log(`🔍 Buscando imagem para país:`, country); // Debug
    
    // Se o país já tem uma URL de imagem da API, usa ela diretamente
    if (country.image) {
      console.log(`✅ Imagem encontrada na API: ${country.image}`); // Debug
      return country.image;
    }
    
    // Se tem um campo imageUrl
    if (country.imageUrl) {
      console.log(`✅ ImageUrl encontrada na API: ${country.imageUrl}`); // Debug
      return country.imageUrl;
    }
    
    // Se tem um campo photo
    if (country.photo) {
      console.log(`✅ Photo encontrada na API: ${country.photo}`); // Debug
      return country.photo;
    }
    
    // Normaliza o nome do país para construir a URL
    const normalizedName = country.name
      .toLowerCase()
      .normalize('NFD')                           // Remove acentos
      .replace(/[\u0300-\u036f]/g, '')           
      .replace(/\s+/g, '')                       // Remove espaços
      .replace(/[^a-z0-9]/g, '');                // Remove caracteres especiais
    
    // Constrói a URL baseada no padrão do seu backend
    const imageUrl = `http://localhost:5000/public/image/${normalizedName}.png`;
    console.log(`🌐 URL construída: ${imageUrl}`); // Debug
    
    return imageUrl;
  };

  // Função para lidar com erro de carregamento de imagem
  const handleImageError = (e) => {
    console.log(`❌ Erro ao carregar: ${e.target.src}`); // Debug
    
    const currentSrc = e.target.src;
    
    // Tenta URLs alternativas
    if (currentSrc.includes('/public/image/')) {
      // Tenta sem o 'public'
      e.target.src = currentSrc.replace('/public/image/', '/image/');
      console.log(`🔄 Tentando sem 'public': ${e.target.src}`);
    } else if (currentSrc.includes('/image/') && !currentSrc.includes('/images/')) {
      // Tenta com 'images' plural
      e.target.src = currentSrc.replace('/image/', '/images/');
      console.log(`🔄 Tentando 'images' plural: ${e.target.src}`);
    } else {
      // Fallback final
      e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop";
      console.log(`🚫 Usando fallback externo`);
    }
  };

  // Função para obter favoritos do localStorage
  const getFavorites = () => {
    if (typeof window !== 'undefined') {
      try {
        const favorites = localStorage.getItem('favoriteCountries');
        if (!favorites || favorites.trim() === '') {
          console.log("📝 LocalStorage de favoritos vazio, retornando array vazio");
          return [];
        }
        const parsed = JSON.parse(favorites);
        console.log("📝 Favoritos carregados do localStorage:", parsed);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("❌ Erro ao fazer parse dos favoritos do localStorage:", error);
        console.log("🧹 Limpando localStorage de favoritos corrompido...");
        localStorage.removeItem('favoriteCountries');
        return [];
      }
    }
    return [];
  };

  // Função para remover favorito
  const removeFavorite = (countryId) => {
    const currentFavorites = getFavorites();
    const newFavorites = currentFavorites.filter(fav => fav.id !== countryId);
    localStorage.setItem('favoriteCountries', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  // Função para navegar para detalhes do país
  const goToCountryDetails = (countryId) => {
    router.push(`/paises/${countryId}`);
  };

  useEffect(() => {
    setFavorites(getFavorites());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.overlay}></div>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Carregando favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.header}>
        <h1 className={styles.title}>Meus Países Favoritos</h1>
        <p className={styles.subtitle}>
          {favorites.length === 0 
            ? "Você ainda não tem países favoritos" 
            : `${favorites.length} país${favorites.length > 1 ? 'es' : ''} favorito${favorites.length > 1 ? 's' : ''}`
          }
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💔</div>
          <h2>Nenhum país favoritado ainda</h2>
          <p>Explore nossos destinos e adicione países aos seus favoritos!</p>
          <button 
            className={styles.exploreButton}
            onClick={() => router.push('/paises')}
          >
            Explorar Países
          </button>
        </div>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map((country) => (
            <div key={country.id} className={styles.favoriteCard}>
              <div className={styles.cardImage}>
                <img 
                  src={getCountryImage(country)} 
                  alt={`Paisagem de ${country.name}`}
                  onError={handleImageError}
                />
                <button 
                  className={styles.removeButton}
                  onClick={() => removeFavorite(country.id)}
                  title="Remover dos favoritos"
                >
                  ❌
                </button>
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.flagSection}>
                  {renderCountryFlag(country)}
                  <div className={styles.countryInfo}>
                    <h3 className={styles.countryName}>{country.name}</h3>
                    <p className={styles.countryLocation}>
                      {country.location || 'Localização não informada'}
                    </p>
                  </div>
                </div>
                
                <button 
                  className={styles.detailsButton}
                  onClick={() => goToCountryDetails(country.id)}
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}