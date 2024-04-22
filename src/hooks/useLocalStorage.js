import { useEffect, useState } from 'react';
import { useAPI } from 'context/APIContext';
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

  // 좋아요 여부 확인
  useEffect(() => {
    const isFavorite = checkLocalStorage('favorites', idx);
    setFavorite(isFavorite);
  }, [idx]);

  // 좋아요 수 업데이트
  const updateLikeCount = async (idx) => {
    try {
      const res = await api.updateLikeCount(idx);
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  // 좋아요한 콘텐츠 저장
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

  // 좋아요한 콘텐츠 가져오기
  const getFavorite = () => getLocalStorage('favorites');

  return { favorite, saveFavorite, getFavorite };
};

export const useHistory = (idx = null) => {
  const [contentId, setContentId] = useState(idx);

  // 최근 본 콘텐츠 저장
  const saveHistory = () => {
    resaveLoaclStorage('history', contentId);
  };

  // 최근 본 콘텐츠 초기화
  const clearHistory = () => {
    clearLocalStorage('history');
  };

  // 최근 본 콘텐츠 가져오기
  const getHistory = () => getLocalStorage('history');

  return { saveHistory, clearHistory, getHistory };
};
