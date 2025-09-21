"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./pais-detalhes.module.css";

export default function PaisDetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Funções de favoritos
  const getFavorites = () => {
    if (typeof window !== 'undefined') {
      const favorites = localStorage.getItem('favoriteCountries');
      return favorites ? JSON.parse(favorites) : [];
    }
    return [];
  };

  const saveFavorites = (favorites) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favoriteCountries', JSON.stringify(favorites));
    }
  };

  const toggleFavorite = () => {
    if (!country) return;
    
    const favorites = getFavorites();
    const countryExists = favorites.find(fav => fav.id === country.id);
    
    if (countryExists) {
      // Remover dos favoritos
      const newFavorites = favorites.filter(fav => fav.id !== country.id);
      saveFavorites(newFavorites);
      setIsFavorite(false);
    } else {
      // Adicionar aos favoritos
      const favoriteCountry = {
        id: country.id,
        name: country.name,
        location: country.location,
        image: getCountryImage(country),
        flag: country.flag
      };
      const newFavorites = [...favorites, favoriteCountry];
      saveFavorites(newFavorites);
      setIsFavorite(true);
    }
  };

  // Verificar se o país está nos favoritos
  useEffect(() => {
    if (country) {
      const favorites = getFavorites();
      const isCountryFavorite = favorites.some(fav => fav.id === country.id);
      setIsFavorite(isCountryFavorite);
    }
  }, [country]);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        console.log("🌍 Buscando detalhes do país ID:", params.id);
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:5000/country/${params.id}`);
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: País não encontrado`);
        }

        const data = await response.json();
        console.log("📊 Dados do país recebidos:", data);
        
        // Debug das estruturas de dados do schema Prisma
        if (data.curiosities) {
          console.log("💡 Estrutura de curiosities:", data.curiosities);
          console.log("🔍 Tipo da primeira curiosity:", typeof data.curiosities[0], data.curiosities[0]);
        }
        if (data.tourists) {
          console.log("🏛️ Estrutura de tourists (pontos turísticos):", data.tourists);
          console.log("🔍 Tipo do primeiro tourist spot:", typeof data.tourists[0], data.tourists[0]);
        }
        
        setCountry(data);
      } catch (err) {
        console.error("❌ Erro ao buscar país:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCountryDetails();
    }
  }, [params.id]);

  // Função para lidar com erro de carregamento de imagem
  const handleImageError = (e) => {
    console.log(`❌ Erro ao carregar: ${e.target.src}`); // Debug
    
    const currentSrc = e.target.src;
    
    // Tenta URLs alternativas
    if (currentSrc.includes('public/image/')) {
      // Tenta sem o 'public'
      e.target.src = currentSrc.replace('public/image/', '/image/');
      console.log(`🔄 Tentando sem 'public': ${e.target.src}`);
    } else if (currentSrc.includes('/image/') && !currentSrc.includes('/images/') && currentSrc.includes('localhost:5000')) {
      // Tenta com 'images' plural no backend
      e.target.src = currentSrc.replace('/image/', '/images/');
      console.log(`🔄 Tentando 'images' plural no backend: ${e.target.src}`);
    } else if (currentSrc.includes('localhost:5000')) {
      // Tenta imagem local sem backend
      const imageName = currentSrc.split('/').pop();
      e.target.src = `/image/${imageName}`;
      console.log(`🔄 Tentando imagem local: ${e.target.src}`);
    } else if (currentSrc.includes('/image/') && !currentSrc.includes('unsplash')) {
      // Fallback para Unsplash
      e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop";
      console.log(`🚫 Usando fallback externo`);
    } else {
      // Fallback final - imagem padrão local
      e.target.src = '/image/default-country.jpg';
      console.log(`🚫 Usando fallback local final`);
    }
  };

  // Função para obter a URL da imagem do backend
  const getCountryImage = (country) => {
    console.log(`🔍 [HERO SECTION] Buscando imagem para país:`, country); // Debug
    
    // Se o país já tem uma URL de imagem da API, usa ela diretamente
    if (country.image) {
      console.log(`✅ [HERO SECTION] Imagem encontrada na API: ${country.image}`); // Debug
      return country.image;
    }
    
    // Se tem um campo imageUrl
    if (country.imageUrl) {
      console.log(`✅ [HERO SECTION] ImageUrl encontrada na API: ${country.imageUrl}`); // Debug
      return country.imageUrl;
    }
    
    // Se tem um campo photo
    if (country.photo) {
      console.log(`✅ [HERO SECTION] Photo encontrada na API: ${country.photo}`); // Debug
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
    console.log(`🌐 [HERO SECTION] URL construída: ${imageUrl}`); // Debug
    
    return imageUrl;
  };

  // Função para formatar custo
  const formatCost = (cost) => {
    if (!cost) return "Não informado";
    return cost;
  };

  // Função para renderizar conteúdo de forma segura
  const renderSafeContent = (content, fallback = "Informação não disponível") => {
    if (typeof content === 'string' && content.trim()) return content;
    if (typeof content === 'number') return content.toString();
    if (Array.isArray(content)) {
      // Se for um array de strings, junta com vírgulas
      if (content.every(item => typeof item === 'string')) {
        return content.join(', ');
      }
      // Se for um array de objetos, tenta extrair o primeiro valor útil
      return content.map(item => renderSafeContent(item, '')).filter(Boolean).join(', ') || fallback;
    }
    if (typeof content === 'object' && content !== null) {
      return content.title || content.name || content.description || content.text || content.value || fallback;
    }
    return fallback;
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Carregando informações do país...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorContainer}>
          <h2>Ops! Algo deu errado</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorContainer}>
          <h2>País não encontrado</h2>
          <p>O país solicitado não foi encontrado em nossa base de dados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>

      {/* Hero Section com imagem do país */}
      <div className={styles.heroSection}>
        <div className={styles.heroImage}>
          <img 
            src={getCountryImage(country)} 
            alt={`Paisagem de ${country.name}`}
            onError={handleImageError}
            onLoad={() => console.log(`✅ Imagem carregada com sucesso na hero section: ${getCountryImage(country)}`)}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.countryTitle}>{country.name}</h1>
            <button 
              className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
              onClick={toggleFavorite}
              title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <span className={styles.heartIcon}>
                {isFavorite ? "❤️" : "🤍"}
              </span>
            </button>
          </div>
          <p className={styles.countrySubtitle}>
            {country.location || 'Localização não informada'}
          </p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className={styles.mainContent}>
        
        {/* Seção especial da bandeira */}
        <div className={styles.flagSection}>
          <div className={styles.flagDisplay}>
            {country.flag ? (
              <img 
                src={country.flag} 
                alt={`Bandeira de ${country.name}`}
                className={styles.countryFlag}
                onError={(e) => {
                  e.target.parentElement.innerHTML = '<div class="' + styles.flagFallback + '">🏳️</div>';
                }}
              />
            ) : (
              <div className={styles.flagFallback}>🏳️</div>
            )}
            <div className={styles.flagInfo}>
              <h3>Bandeira Nacional</h3>
              <p>Símbolo oficial de {country.name}</p>
            </div>
          </div>
        </div>

        {/* Informações básicas */}
        <div className={styles.infoSection}>
          <h2>Informações Gerais</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🏛️</div>
              <h3>Capital</h3>
              <p>{renderSafeContent(country.capital, 'Não informado')}</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>�️</div>
              <h3>Idioma</h3>
              <p>{renderSafeContent(country.language, 'Não informado')}</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>�</div>
              <h3>Moeda</h3>
              <p>{renderSafeContent(country.coin, 'Não informado')}</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>�</div>
              <h3>Custo de Viagem</h3>
              <p>{formatCost(country.cost)}</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🌍</div>
              <h3>Localização</h3>
              <p>{renderSafeContent(country.location, 'Não informado')}</p>
            </div>
          </div>
        </div>

        {/* Pontos Turísticos */}
        {country.tourists && Array.isArray(country.tourists) && country.tourists.length > 0 && (
          <div className={styles.attractionsSection}>
            <h2>Pontos Turísticos</h2>
            <div className={styles.attractionsList}>
              {country.tourists.map((tourist, index) => (
                <div key={tourist.id || index} className={styles.attractionItem}>
                  {tourist.imageUrl && (
                    <div className={styles.attractionImage}>
                      <img 
                        src={tourist.imageUrl} 
                        alt={tourist.title}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className={styles.attractionContent}>
                    <h4>{renderSafeContent(tourist.title, `Ponto Turístico ${index + 1}`)}</h4>
                    {tourist.description && (
                      <p>{renderSafeContent(tourist.description)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Curiosidades */}
        {country.curiosities && Array.isArray(country.curiosities) && country.curiosities.length > 0 && (
          <div className={styles.curiositiesSection}>
            <h2>Curiosidades</h2>
            <div className={styles.curiositiesList}>
              {country.curiosities.map((curiosity, index) => (
                <div key={curiosity.id || index} className={styles.curiosityItem}>
                  <span className={styles.curiosityIcon}>💡</span>
                  <div className={styles.curiosityContent}>
                    <h4>{renderSafeContent(curiosity.title, `Curiosidade ${index + 1}`)}</h4>
                    {curiosity.description && (
                      <p>{renderSafeContent(curiosity.description)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
