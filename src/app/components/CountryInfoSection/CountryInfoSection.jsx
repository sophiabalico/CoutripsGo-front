import styles from '../../paises/[id]/pais-detalhes.module.css';

export default function CountryInfoSection({ 
  country, 
  renderSafeContent, 
  formatCost 
}) {
  const infoItems = [
    {
      icon: '🏛️',
      title: 'Capital',
      content: renderSafeContent(country.capital, 'Não informado')
    },
    {
      icon: '🗨',
      title: 'Idioma',
      content: renderSafeContent(country.language, 'Não informado')
    },
    {
      icon: '💰',
      title: 'Moeda',
      content: renderSafeContent(country.coin, 'Não informado')
    },
    {
      icon: '✈️',
      title: 'Custo de Viagem',
      content: formatCost(country.cost)
    },
    {
      icon: '🌍',
      title: 'Localização',
      content: renderSafeContent(country.location, 'Não informado')
    }
  ];

  return (
    <div className={styles.infoSection}>
      <h2>Informações Gerais</h2>
      <div className={styles.infoGrid}>
        {infoItems.map((item, index) => (
          <div key={index} className={styles.infoCard}>
            <div className={styles.infoIcon}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}