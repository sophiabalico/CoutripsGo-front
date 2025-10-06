import styles from './MenuOverlay.module.css';

export default function MenuOverlay({ isVisible, onClick }) {
  if (!isVisible) return null;
  
  return (
    <div 
      className={styles.overlay} 
      onClick={onClick}
    />
  );
}