import React, { useEffect, useState } from 'react';
import { useAPI } from 'context/APIContext';
import { checkLocalStorage, deleteLocalStorage, saveLocalStorage } from 'utils/localStorage';
import { LikeFilledIcon, LikeUnfilledIcon } from 'assets';

const LikeButton = (props) => {
  const { idx } = props;
  const { api } = useAPI();
  const [favorite, setFavorite] = useState(false);

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

  useEffect(() => {
    const isFavorite = checkLocalStorage('favorites', idx);
    setFavorite(isFavorite);
  }, [idx]);

  return (
    <button type="button" aria-label="like_button" onClick={saveFavorite}>
      {favorite ? (
        <LikeFilledIcon width={18} height={16} fill={'var(--color-blue)'} />
      ) : (
        <LikeUnfilledIcon width={18} height={16} fill={'var(--color-blue)'} />
      )}
    </button>
  );
};

export default LikeButton;
