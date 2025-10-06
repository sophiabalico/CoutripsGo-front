import styles from '../../paises/[id]/pais-detalhes.module.css';

export default function CountryCuriosities({ 
  curiosities, 
  renderSafeContent 
}) {
  if (!curiosities || !Array.isArray(curiosities) || curiosities.length === 0) {
    return null;
  }

  return (
    <div className={styles.curiositiesSection}>
      <h2>Curiosidades</h2>
      <div className={styles.curiositiesList}>
        {curiosities.map((curiosity, index) => (
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
  );
}