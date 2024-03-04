import { useNavigate } from 'react-router-dom';
import { formatAgo } from 'utils/date';
import { LikeButton } from 'components';
import { ViewIcon } from 'assets';
import 'styles/Card.css';
import style from 'styles/TypeC.module.css';

const onErrorImg = (e) => (e.target.src = '/assets/no_image.png');

const TypeC = ({ content }) => {
  const navigate = useNavigate();
  const locale = process.env.REACT_APP_LOCALE;
  const baseURL = process.env.REACT_APP_BASE_IMG_URL;
  const { idx, thumbnail, logo, channel, title, category, publishedAt, viewCount } = content;

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
          <span id="publishedAt">{formatAgo(publishedAt, locale)}</span>
          <span>|</span>
          <span id="category">{category}</span>
        </div>
        <div className="like">
          <ViewIcon width={16} height={16} fill={'var(--color-blue)'} />
          <p id="viewCount">{viewCount.toLocaleString('ko-KR')}</p>
          <LikeButton idx={idx} />
        </div>
      </div>
    </li>
  );
};

export default TypeC;
