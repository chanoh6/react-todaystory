import { useEffect, useState } from 'react';

const statusFavorite = (idx) => {
  let favorites = localStorage.getItem('favorites');
  if (!favorites) return false;
  favorites = JSON.parse(favorites);
  favorites = new Set(favorites);
  const isFavorite = favorites.has(idx);
  return isFavorite;
};

const saveFavorite = (idx) => {
  let favorites = localStorage.getItem('favorites');
  favorites = favorites ? JSON.parse(favorites) : [];
  favorites = new Set(favorites);
  favorites.add(idx);
  favorites = [...favorites];
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const deleteFavorite = (idx) => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(favorites);
    favorites = favorites.filter((i) => i !== idx);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

export const useFavorite = (idx) => {
  const [favorite, setFavorite] = useState(false);
  const isFavorite = statusFavorite(idx);

  useEffect(() => {
    setFavorite(isFavorite);
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();

    if (isFavorite) {
      deleteFavorite(idx);
    } else {
      saveFavorite(idx);
    }
    setFavorite((prev) => !prev);
  };

  return { favorite, handleClick };
};
