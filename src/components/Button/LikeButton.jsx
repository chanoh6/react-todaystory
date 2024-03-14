import { useFavorite } from 'hooks/useLocalStorage';
import { LikeFilledIcon, LikeUnfilledIcon } from 'assets';
import { useEffect, useState } from 'react';

const LikeButton = ({ idx }) => {
  const { favorite, setFavorite, saveFavorite, getFavorite } = useFavorite(idx);
  let testArr = getFavorite();

  useEffect(() => {}, [favorite]);

  return (
    <button onClick={saveFavorite}>
      {favorite ? (
        <LikeFilledIcon width={18} height={16} fill={'var(--color-blue)'} />
      ) : (
        <LikeUnfilledIcon width={18} height={16} fill={'var(--color-blue)'} />
      )}
    </button>
  );
};

export default LikeButton;
