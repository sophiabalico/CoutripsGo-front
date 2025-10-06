"use client";

import { useRouter } from 'next/navigation';
import styles from './EmptyFavorites.module.css';

export default function EmptyFavorites() {
  const router = useRouter();

  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>💔</div>
      <h2>Nenhum país favoritado ainda</h2>
      <p>Explore nossos destinos e adicione países aos seus favoritos!</p>
      <button 
        className={styles.exploreButton}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push('/paises');
        }}
      >
        Explorar Países
      </button>
    </div>
  );
}