import { useCard } from 'hooks/useCard';
import { LikeButton } from 'components';
import { ViewIcon } from 'assets';
import 'styles/Card.css';
import style from 'styles/TypeC.module.css';

const TypeC = ({ content }) => {
  const { idx, category, channel, title, thumbnail, logo, publishedAt, viewCount, handleClick, onErrorImg } =
    useCard(content);

  return (
    <li className="card" onClick={handleClick}>
      <div className={style.card__info}>
        <div className={style.card__title}>
          <div className="cp">
            <img src={logo} alt="cp logo" onError={onErrorImg} />
            <p>{channel}</p>
          </div>
          <p className="title">{title}</p>
        </div>
        <figure className={style.thumbnail}>
          <img src={thumbnail} alt="thumbnail" onError={onErrorImg} />
        </figure>
      </div>
      <div className="card__more">
        <div className="date">
          <span id="publishedAt">{publishedAt}</span>
          <span>|</span>
          <span id="category">{category}</span>
        </div>
        <div className="like">
          <ViewIcon width={16} height={16} />
          <p id="viewCount">{viewCount}</p>
          <LikeButton idx={idx} />
        </div>
      </div>
    </li>
  );
};

export default TypeC;
