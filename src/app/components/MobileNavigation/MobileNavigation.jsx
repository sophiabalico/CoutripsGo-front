import styles from './MobileNavigation.module.css';

export default function MobileNavigation({ isOpen, onLinkClick }) {
  return (
    <nav className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ''}`}>
      <a href="/" onClick={onLinkClick}>Home</a>
      <a href="/paises" onClick={onLinkClick}>Explorar Países</a>
      <a href="/favoritos" onClick={onLinkClick}>Meus Favoritos</a>
      <a href="/sobre" onClick={onLinkClick}>Sobre</a>
      <a href="/contato" onClick={onLinkClick}>Contato</a>
    </nav>
  );
}