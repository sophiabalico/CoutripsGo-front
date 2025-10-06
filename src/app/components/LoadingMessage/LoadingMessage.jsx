import styles from './LoadingMessage.module.css';

export default function LoadingMessage({ message = "Carregando países..." }) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>{message}</p>
    </div>
  );
}