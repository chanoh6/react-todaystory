import { useFavorite } from 'hooks/useLocalStorage';
import { LikeFilledIcon, LikeUnfilledIcon } from 'assets';

const LikeButton = (props) => {
  const { idx } = props;
  const { favorite, saveFavorite } = useFavorite(idx);

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
