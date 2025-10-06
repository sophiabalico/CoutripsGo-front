"use client";
import styles from "./Header.module.css";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import MenuOverlay from "../MenuOverlay/MenuOverlay";
import { useMobileMenu } from "../hooks/useMobileMenu";

export default function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();

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
      <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />

      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isMenuOpen} onLinkClick={closeMenu} />

      {/* Overlay for mobile menu */}
      <MenuOverlay isVisible={isMenuOpen} onClick={closeMenu} />
    </header>
  );
}
