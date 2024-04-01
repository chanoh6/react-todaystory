import { useCard } from 'hooks/useCard';
import { LikeButton } from 'components';
import 'styles/Card.css';
import style from 'styles/TypeC.module.css';
import React from 'react';

const TypeC = React.memo((props) => {
  const { content } = props;
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
        <span id="publishedAt">{publishDate}</span>
        <LikeButton idx={idx} />
      </div>
    </li>
  );
});

export default TypeC;
