import styles from '../../paises/[id]/pais-detalhes.module.css';

export default function CountryHero({ 
  country, 
  isFavorite, 
  onToggleFavorite, 
  getCountryImage, 
  handleImageError 
}) {
  return (
    <div className={styles.entrySection}>
      <div className={styles.entryImageContainer}>
        <img 
          src={getCountryImage(country)} 
          alt={`Imagem principal de ${country.name}`}
          className={styles.entryImage}
          onError={handleImageError}
          onLoad={() => console.log(`✅ Imagem de entrada carregada: ${getCountryImage(country)}`)}
        />
        <div className={styles.entryOverlay}>
          <div className={styles.entryContent}>
            <div className={styles.titleSection}>
              <h1 className={styles.entryTitle}>{country.name}</h1>
              <button 
                className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
                onClick={onToggleFavorite}
                title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <span className={styles.heartIcon}>
                  {isFavorite ? "❤️" : "🤍"}
                </span>
              </button>
            </div>
            <p className={styles.entryLocation}>
              {country.location || 'Localização não informada'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}