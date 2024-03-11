import { useCard } from 'hooks/useCard';
import { LikeButton } from 'components';
import 'styles/Card.css';
import style from 'styles/TypeB.module.css';

const TypeB = ({ content }) => {
  const { idx, channel, title, thumbnail, logo, publishDate, handleClick, onErrorImg } = useCard(content);

  return (
    <li className={style.card} onClick={handleClick}>
      <figure className="thumbnail">
        <img src={thumbnail} alt="thumbnail" onError={onErrorImg} />
      </figure>
      <div className={style.card__title}>
        <div className="cp">
          <img src={logo} alt="cp logo" onError={onErrorImg} />
          <p>{channel}</p>
        </div>
        <p className="title">{title}</p>
      </div>
      <div className="card__more">
        <span id="publishedAt">{publishDate}</span>
        <LikeButton idx={idx} />
      </div>
    </li>
  );
};

export default TypeB;
