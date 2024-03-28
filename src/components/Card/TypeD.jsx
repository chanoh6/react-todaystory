import { useCard } from 'hooks/useCard';
import { useFavorite } from 'hooks/useLocalStorage';
import { LikeFilledIcon, LikeUnfilledIcon } from 'assets';
import 'styles/Card.css';
import style from 'styles/TypeC.module.css';

const TypeD = (props) => {
  const { content, onClick } = props;
  const { idx, category, cp, title, thumbnail, logo, publishDate, viewCount, handleClick, onErrorImg, onErrorLogo } =
    useCard(content);
  const { favorite, saveFavorite } = useFavorite(idx);

  const handleButtonClick = (e) => {
    saveFavorite(e);
    onClick(idx);
  };

  return (
    <li className="card" onClick={handleClick}>
      <div className={style.card__info}>
        <div className={style.card__title}>
          <div className="cp">
            <img loading="lazy" src={logo} alt="cp logo" onError={onErrorLogo} />
            <p>{cp}</p>
          </div>
          <p className="title">{title}</p>
        </div>
        <figure className={style.thumbnail}>
          <img loading="lazy" src={thumbnail} alt="thumbnail" onError={onErrorImg} />
        </figure>
      </div>
      <div className="card__more">
        <span id="publishedAt">{publishDate}</span>
        <button type="button" aria-label="like_button" onClick={handleButtonClick}>
          {favorite ? (
            <LikeFilledIcon width={18} height={16} fill={'var(--color-blue)'} />
          ) : (
            <LikeUnfilledIcon width={18} height={16} fill={'var(--color-blue)'} />
          )}
        </button>
      </div>
    </li>
  );
};

export default TypeD;
