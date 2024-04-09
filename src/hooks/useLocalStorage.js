import { useAPI } from 'context/APIContext';
import { useEffect, useState } from 'react';
import {
  checkLocalStorage,
  resaveLoaclStorage,
  saveLocalStorage,
  deleteLocalStorage,
  clearLocalStorage,
  getLocalStorage,
} from 'utils/localStorage';

export const useFavorite = (idx) => {
  const { api } = useAPI();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const isFavorite = checkLocalStorage('favorites', idx);
    setFavorite(isFavorite);
  }, [idx]);

  const updateLikeCount = async (idx) => {
    try {
      const res = await api.updateLikeCount(idx);
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const saveFavorite = (e) => {
    e.stopPropagation();

    if (favorite) {
      deleteLocalStorage('favorites', idx);
    } else {
      saveLocalStorage('favorites', idx);
      updateLikeCount(idx);
    }
    setFavorite((prev) => !prev);
  };

  const getFavorite = () => getLocalStorage('favorites');

  return { favorite, saveFavorite, getFavorite };
};

export const useHistory = (idx = null) => {
  const saveHistory = (idx) => {
    resaveLoaclStorage('history', idx);
  };

  const clearHistory = () => {
    clearLocalStorage('history');
  };

  const getHistory = () => getLocalStorage('history');

  return { saveHistory, clearHistory, getHistory };
};
