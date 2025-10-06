import styles from '../../paises/[id]/pais-detalhes.module.css';

export default function TouristAttractions({ 
  tourists, 
  renderSafeContent 
}) {
  if (!tourists || !Array.isArray(tourists) || tourists.length === 0) {
    return null;
  }

  return (
    <div className={styles.attractionsSection}>
      <h2>Pontos Turísticos</h2>
      <div className={styles.attractionsList}>
        {tourists.map((tourist, index) => (
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
  );
}