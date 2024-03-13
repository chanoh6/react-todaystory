import { useCard } from 'hooks/useCard';
import { LikeButton } from 'components';
import 'styles/Card.css';
import style from 'styles/TypeB.module.css';

const TypeB = (props) => {
  const { content } = props;
  const { idx, cp, title, thumbnail, logo, publishDate, handleClick, onErrorImg, onErrorLogo } = useCard(content);

  return (
    <li className={style.card} onClick={handleClick}>
      <figure className="thumbnail">
        <img loading="lazy" src={thumbnail} alt="thumbnail" onError={onErrorImg} />
      </figure>
      <div className={style.card__title}>
        <div className="cp">
          <img loading="lazy" src={logo} alt="cp logo" onError={onErrorLogo} />
          <p>{cp}</p>
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
