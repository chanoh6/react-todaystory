import React from 'react';
import { useCard } from 'hooks/useCard';
import { LikeButton } from 'components';
import 'styles/Card.css';
import style from 'styles/TypeC.module.css';

const TypeC = React.memo((props) => {
  const { content, onClick } = props;
  const { idx, cp, title, thumbnail, logo, publishDate, handleClick, onErrorImg, onErrorLogo } = useCard(content);

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
        <LikeButton idx={idx} onClick={onClick} />
      </div>
    </li>
  );
});

export default TypeC;
