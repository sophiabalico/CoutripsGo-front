"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './favoritos.module.css';

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      const favorites = localStorage.getItem('favoriteCountries');
      return favorites ? JSON.parse(favorites) : [];
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
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Carregando favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
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
                  {country.flag && (
                    <img 
                      src={country.flag} 
                      alt={`Bandeira de ${country.name}`}
                      className={styles.flagIcon}
                    />
                  )}
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