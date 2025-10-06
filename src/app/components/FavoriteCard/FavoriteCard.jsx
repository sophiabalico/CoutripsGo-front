"use client";

import { useRouter } from 'next/navigation';
import styles from './FavoriteCard.module.css';

export default function FavoriteCard({ country, onRemove }) {
  const router = useRouter();

  // Função para verificar se é uma URL válida de imagem
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
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
    const getCountryCode = (countryName) => {
      const codes = {
        'Estados Unidos': 'us', 'United States': 'us', 'USA': 'us',
        'França': 'fr', 'France': 'fr',
        'Brasil': 'br', 'Brazil': 'br',
      };
      return codes[countryName] || countryName.toLowerCase().substring(0, 2);
    };

    const getCountryEmoji = (countryName) => {
      const emojis = {
        'Estados Unidos': '🇺🇸', 'United States': '🇺🇸', 'USA': '🇺🇸',
        'França': '🇫🇷', 'France': '🇫🇷',
        'Brasil': '🇧🇷', 'Brazil': '🇧🇷',
      };
      return emojis[countryName] || '🏳️';
    };

    if (isValidImageUrl(country.flag)) {
      return (
        <img 
          src={country.flag} 
          alt={`Bandeira de ${country.name}`}
          className={styles.flagIcon}
          onError={(e) => {
            if (!e.target.src.includes('flagcdn.com')) {
              const countryCode = getCountryCode(country.name);
              e.target.src = `https://flagcdn.com/w320/${countryCode}.png`;
            } else {
              e.target.style.display = 'none';
              const fallbackDiv = document.createElement('div');
              fallbackDiv.className = styles.flagIcon;
              fallbackDiv.textContent = getCountryEmoji(country.name);
              e.target.parentNode.insertBefore(fallbackDiv, e.target);
            }
          }}
        />
      );
    } else {
      return (
        <div className={styles.flagIcon}>
          {country.flag || getCountryEmoji(country.name)}
        </div>
      );
    }
  };

  // Função para obter a URL da imagem do país
  const getCountryImage = (country) => {
    if (country.image) return country.image;
    if (country.imageUrl) return country.imageUrl;
    if (country.photo) return country.photo;
    
    const normalizedName = country.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
    
    return `http://localhost:5000/public/image/${normalizedName}.png`;
  };

  // Função para lidar com erro de carregamento de imagem
  const handleImageError = (e) => {
    const currentSrc = e.target.src;
    
    if (currentSrc.includes('/public/image/')) {
      e.target.src = currentSrc.replace('/public/image/', '/image/');
    } else if (currentSrc.includes('/image/') && !currentSrc.includes('/images/')) {
      e.target.src = currentSrc.replace('/image/', '/images/');
    } else {
      e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop";
    }
  };

  return (
    <div className={styles.favoriteCard}>
      <div className={styles.cardImage}>
        <img 
          src={getCountryImage(country)} 
          alt={`Paisagem de ${country.name}`}
          onError={handleImageError}
        />
        <button 
          className={styles.removeButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove(country.id);
          }}
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/paises/${country.id}`);
          }}
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}