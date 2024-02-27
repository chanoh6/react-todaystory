import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { formatAgo } from 'utils/date';
import { LikeUnfilledIcon, LikeFilledIcon, ViewIcon } from 'assets';
import 'styles/Card.css';
import style from 'styles/CardS.module.css';

const onErrorImg = (e) => (e.target.src = '/assets/no_image.png');

const CardS = ({ content }) => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_IMG_URL;
  const { idx, thumbnail, logo, channel, title, category, publishedAt, viewCount } = content;
  const [like, setLike] = useState(false);
  return (
    <li className="card" onClick={() => navigate(`/view/${idx}`, { state: { content } })}>
      <div className={style.card__info}>
        <div className={style.card__title}>
          <div className="cp">
            <img src={`${baseURL}cp/${logo}`} alt="cp logo" onError={onErrorImg} />
            <p>{channel}</p>
          </div>
          <p className="title">{title}</p>
        </div>
        <figure className={style.thumbnail}>
          <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="thumbnail" onError={onErrorImg} />
        </figure>
      </div>
      <div className="card__more">
        <div className="date">
          <span id="publishedAt">{formatAgo(publishedAt, 'ko')}</span>
          <span>|</span>
          <span id="category">{category}</span>
        </div>
        <div
          className="like"
          onClick={(e) => {
            e.stopPropagation();
            setLike(!like);
          }}
        >
          <ViewIcon width={16} height={16} fill={'var(--color-blue)'} />
          <p id="viewCount">{viewCount.toLocaleString('ko-KR')}</p>
          {like ? (
            <LikeFilledIcon width={16} height={16} fill={'var(--color-blue)'} />
          ) : (
            <LikeUnfilledIcon width={16} height={16} fill={'var(--color-blue)'} />
          )}
        </div>
      </div>
    </li>
  );
};

export default CardS;
