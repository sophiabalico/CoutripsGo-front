import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.navbar}>
      <h1 className={styles.logo}>Coutrips Go</h1>
      <nav className={styles.navLinks}>
        <a href="/">Home</a>
        <a href="/paises">Explorar Países</a>
        <a href="/favoritos">Meus Favoritos</a>
        <a href="/sobre">Sobre</a>
        <a href="/contato">Contato</a>
      </nav>
    </header>
  );
}
