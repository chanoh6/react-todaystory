import { useEffect, useState } from 'react';
import { checkLocalStorage, deleteLocalStorage, saveLocalStorage } from 'utils/localStorage';
import { LikeFilledIcon, LikeUnfilledIcon } from 'assets';

const LikeButton = (props) => {
  const { idx } = props;
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const isFavorite = checkLocalStorage('favorites', idx);
    setFavorite(isFavorite);
  }, [idx]);

  const saveFavorite = (e) => {
    e.stopPropagation();

    if (favorite) {
      deleteLocalStorage('favorites', idx);
    } else {
      saveLocalStorage('favorites', idx);
    }

    setFavorite((prev) => !prev);
  };

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
