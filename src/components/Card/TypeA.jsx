import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatAgo } from 'utils/date';
import { useFavorite } from 'hooks/favorite';
import { LikeFilledIcon, LikeUnfilledIcon, ViewIcon } from 'assets';
import 'styles/Card.css';

const onErrorImg = (e) => (e.target.src = '/assets/no_image.png');

const TypeA = ({ content }) => {
  const navigate = useNavigate();
  const locale = process.env.REACT_APP_LOCALE;
  const baseURL = process.env.REACT_APP_BASE_IMG_URL;
  const { idx, thumbnail, logo, channel, title, category, publishedAt, viewCount } = content;
  const { favorite, handleClick } = useFavorite(idx);

  return (
    <li data-idx={idx} className="card" onClick={() => navigate(`/view/${idx}`, { state: { content } })}>
      <figure className="thumbnail">
        <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="thumbnail" onError={onErrorImg} />
      </figure>
      <div className="card__title">
        <div className="cp">
          <img src={`${baseURL}cp/${logo}`} alt="cp logo" onError={onErrorImg} />
          <p>{channel}</p>
        </div>
        <p className="title">{title}</p>
      </div>
      <div className="card__more">
        <div className="date">
          <span id="publishedAt">{formatAgo(publishedAt, locale)}</span>
          <span>|</span>
          <span id="category">{category}</span>
        </div>
        <div className="like">
          <ViewIcon width={16} height={16} fill={'var(--color-blue)'} />
          <p id="viewCount">{viewCount.toLocaleString('ko-KR')}</p>
          <button onClick={handleClick}>
            {favorite ? (
              <LikeFilledIcon width={16} height={16} fill={'var(--color-blue)'} />
            ) : (
              <LikeUnfilledIcon width={16} height={16} fill={'var(--color-blue)'} />
            )}
          </button>
        </div>
      </div>
    </li>
  );
};

export default TypeA;
