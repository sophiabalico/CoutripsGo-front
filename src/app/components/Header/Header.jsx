"use client";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <h1 className={styles.logo}>Coutrips Go</h1>
      
      {/* Desktop Navigation */}
      <nav className={styles.navLinks}>
        <a href="/">Home</a>
        <a href="/paises">Explorar Países</a>
        <a href="/favoritos">Meus Favoritos</a>
        <a href="/sobre">Sobre</a>
        <a href="/contato">Contato</a>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className={styles.menuToggle}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}></span>
        <span className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}></span>
        <span className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}></span>
      </button>

      {/* Mobile Navigation */}
      <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
        <a href="/" onClick={closeMenu}>Home</a>
        <a href="/paises" onClick={closeMenu}>Explorar Países</a>
        <a href="/favoritos" onClick={closeMenu}>Meus Favoritos</a>
        <a href="/sobre" onClick={closeMenu}>Sobre</a>
        <a href="/contato" onClick={closeMenu}>Contato</a>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeMenu}
        ></div>
      )}
    </header>
  );
}
