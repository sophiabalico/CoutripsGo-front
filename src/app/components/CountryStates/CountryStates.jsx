import styles from '../../paises/[id]/pais-detalhes.module.css';

export function LoadingCountry() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando detalhes do país...</p>
      </div>
    </div>
  );
}

export function ErrorCountry({ message }) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.errorContainer}>
        <h2>Erro ao carregar país</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export function CountryNotFound() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.errorContainer}>
        <h2>País não encontrado</h2>
        <p>O país solicitado não foi encontrado em nossa base de dados.</p>
      </div>
    </div>
  );
}