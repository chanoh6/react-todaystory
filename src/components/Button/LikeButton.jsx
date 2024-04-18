import React from 'react';
import { LikeFilledIcon, LikeUnfilledIcon } from 'assets';
import { useFavorite } from 'hooks/useLocalStorage';

const LikeButton = (props) => {
  const { idx, onClick } = props;
  const { favorite, saveFavorite } = useFavorite(idx);

  const handleButtonClick = (e) => {
    saveFavorite(e);
    onClick?.(idx);
  };

  return (
    <button type="button" aria-label="like_button" onClick={handleButtonClick}>
      {favorite ? (
        <LikeFilledIcon width={18} height={16} fill={'var(--color-blue)'} />
      ) : (
        <LikeUnfilledIcon width={18} height={16} fill={'var(--color-blue)'} />
      )}
    </button>
  );
};

export default LikeButton;
