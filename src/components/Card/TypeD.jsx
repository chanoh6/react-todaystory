import { useCard } from 'hooks/useCard';
import { LikeButton } from 'components';
import { ViewIcon } from 'assets';
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';

const TypeD = ({ content }) => {
  const { idx, category, cp, title, thumbnail, logo, publishDate, viewCount, handleClick, onErrorImg } =
    useCard(content);

  return (
    <article className={style.card} onClick={handleClick}>
      <div className={style.card__img}>
        <figure className={style.thumbnail}>
          <img src={thumbnail} alt="thumbnail" onError={onErrorImg} />
        </figure>
        <figure className={style.background}>
          <img src={thumbnail} alt="background" onError={onErrorImg} />
        </figure>
      </div>
      <div className="card__title">
        <div className="cp">
          <img src={logo} alt="cp logo" onError={onErrorImg} />
          <p>{cp}</p>
        </div>
        <p className="title">{title}</p>
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
          <LikeButton idx={idx} />
        </div>
      </div>
    </article>
  );
};

export default TypeD;
