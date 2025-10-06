import styles from '../../paises/[id]/pais-detalhes.module.css';

export default function CountryFlag({ 
  country, 
  getCountryFlag, 
  handleFlagError 
}) {
  return (
    <div className={styles.flagSection}>
      <div className={styles.flagDisplay}>
        <img 
          src={getCountryFlag(country)} 
          alt={`Bandeira de ${country.name}`}
          className={styles.countryFlag}
          onError={(e) => handleFlagError(e, country)}
          onLoad={() => console.log(`✅ Bandeira carregada: ${getCountryFlag(country)}`)}
        />
        <div className={styles.flagInfo}>
          <h3>Bandeira Nacional</h3>
          <p>Símbolo oficial de {country.name}</p>
        </div>
      </div>
    </div>
  );
}