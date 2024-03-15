import { useCard } from 'hooks/useCard';
import { LikeButton } from 'components';
import { ViewIcon } from 'assets';
import 'styles/Card.css';
import style from 'styles/TypeC.module.css';

const TypeC = (props) => {
  const { content, onClick = null } = props;
  const { idx, category, cp, title, thumbnail, logo, publishDate, viewCount, handleClick, onErrorImg, onErrorLogo } =
    useCard(content);

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
    </li>
  );
};

export default TypeC;
