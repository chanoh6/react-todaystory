import { useEffect, useState } from 'react';
import { checkLocalStorage, deleteLocalStorage, saveLocalStorage } from 'utils/localStorage';

export const useFavorite = (idx) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const isFavorite = checkLocalStorage('favorites', idx);
    setFavorite(isFavorite);
  }, []);

  const saveFavorite = (e) => {
    e.stopPropagation();

    if (favorite) {
      deleteLocalStorage('favorites', idx);
    } else {
      saveLocalStorage('favorites', idx);
    }
    setFavorite((prev) => !prev);
  };

  return { favorite, saveFavorite };
};
