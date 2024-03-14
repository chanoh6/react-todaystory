import { forwardRef } from 'react';
import { useCard } from 'hooks/useCard';
import { LikeFilledIcon, LikeUnfilledIcon, ViewIcon } from 'assets';
import 'styles/Card.css';
import style from 'styles/TypeC.module.css';
import { useFavorite } from 'hooks/useLocalStorage';

const TypeE = forwardRef((props, ref) => {
  const { content, cardId, onClick } = props;
  const { idx, category, cp, title, thumbnail, logo, publishDate, viewCount, handleClick, onErrorImg, onErrorLogo } =
    useCard(content);
  const { favorite, saveFavorite } = useFavorite(idx);

  const handleButtonClick = (e) => {
    saveFavorite(e);
    onClick(cardId);
  };

  return (
    <li className="card" onClick={handleClick} ref={ref}>
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
        <div className="date">
          <span id="publishedAt">{publishDate}</span>
          <span>|</span>
          <span id="category">{category}</span>
        </div>
        <div className="like">
          <ViewIcon width={16} height={16} />
          <p id="viewCount">{viewCount}</p>
          <button onClick={handleButtonClick}>
            {favorite ? (
              <LikeFilledIcon width={18} height={16} fill={'var(--color-blue)'} />
            ) : (
              <LikeUnfilledIcon width={18} height={16} fill={'var(--color-blue)'} />
            )}
          </button>
        </div>
      </div>
    </li>
  );
});

export default TypeE;
