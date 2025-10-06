"use client";

import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para obter favoritos do localStorage
  const getFavorites = () => {
    if (typeof window !== 'undefined') {
      try {
        const favorites = localStorage.getItem('favoriteCountries');
        if (!favorites || favorites.trim() === '') {
          return [];
        }
        const parsed = JSON.parse(favorites);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
        localStorage.removeItem('favoriteCountries');
        return [];
      }
    }
    return [];
  };

  // Função para salvar favoritos no localStorage
  const saveFavorites = (newFavorites) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favoriteCountries', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    }
  };

  // Função para remover favorito
  const removeFavorite = (countryId) => {
    const currentFavorites = getFavorites();
    const newFavorites = currentFavorites.filter(fav => fav.id !== countryId);
    saveFavorites(newFavorites);
  };

  // Função para adicionar favorito
  const addFavorite = (country) => {
    const currentFavorites = getFavorites();
    const isAlreadyFavorite = currentFavorites.some(fav => fav.id === country.id);
    
    if (!isAlreadyFavorite) {
      const newFavorites = [...currentFavorites, country];
      saveFavorites(newFavorites);
      return true;
    }
    return false;
  };

  // Carregar favoritos na inicialização
  useEffect(() => {
    setFavorites(getFavorites());
    setLoading(false);
  }, []);

  return {
    favorites,
    loading,
    removeFavorite,
    addFavorite,
    getFavorites
  };
};