import styles from './HamburgerButton.module.css';

export default function HamburgerButton({ isOpen, onClick }) {
  return (
    <button 
      className={styles.menuToggle}
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <span className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}></span>
      <span className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}></span>
      <span className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}></span>
    </button>
  );
}