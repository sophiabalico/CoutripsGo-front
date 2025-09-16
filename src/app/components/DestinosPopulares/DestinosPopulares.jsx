import styles from "../DestinosPopulares/DestinosPopulares.module.css";

export default function DestinosPopulares({ places }) {
  return (
    <section className={styles.destinations}>
      <h3>Destinos Populares</h3>
      <div className={styles.grid}>
        {places.map((place, i) => (
          <div key={i} className={styles.card}>
            <img src={place.img} alt={place.name} />
            <div className={styles.cardTitle}>{place.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
