"use client";

import { useFavorites } from '../components/hooks/useFavorites';
import FavoriteCard from '../components/FavoriteCard/FavoriteCard';
import EmptyFavorites from '../components/EmptyFavorites/EmptyFavorites';
import styles from './favoritos.module.css';

export default function FavoritosPage() {
  const { favorites, loading, removeFavorite } = useFavorites();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.overlay}></div>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Carregando favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.header}>
        <h1 className={styles.title}>Meus Países Favoritos</h1>
        <p className={styles.subtitle}>
          {favorites.length === 0 
            ? "Você ainda não tem países favoritos" 
            : `${favorites.length} país${favorites.length > 1 ? 'es' : ''} favorito${favorites.length > 1 ? 's' : ''}`
          }
        </p>
      </div>

      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map((country) => (
            <FavoriteCard
              key={country.id}
              country={country}
              onRemove={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}