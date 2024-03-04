import { useFavorite } from "hooks/favorite";
import { LikeFilledIcon, LikeUnfilledIcon } from "assets";


const LikeButton = ({ idx }) => {
  const { favorite, saveFavorite } = useFavorite(idx);

  return (
    <button onClick={saveFavorite}>
      {favorite ? (
          <LikeFilledIcon width={16} height={16} fill={'var(--color-blue)'} />
        ) : (
          <LikeUnfilledIcon width={16} height={16} fill={'var(--color-blue)'} />
        )}
    </button>
  )
}

export default LikeButton;
