import { useNavigate } from 'react-router-dom';
import { formatAgo } from 'utils/date';
import 'styles/Card.css';
import style from 'styles/CardS.module.css';
import { ReactComponent as LikeIcon } from 'assets/icon/LikeUnfilled.svg';
import { ReactComponent as ViewIcon } from 'assets/icon/View.svg';

const onErrorImg = (e) => (e.target.src = '/assets/no_image.png');

const CardS = ({ content }) => {
  const navigate = useNavigate();
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
          <span id="publishedAt">{formatAgo(publishedAt, 'ko')}</span>
          <span>|</span>
          <span id="category">{category}</span>
        </div>
        <div className="like">
          <ViewIcon width={16} height={16} fill={'#459AFF'} />
          <p id="viewCount">{viewCount.toLocaleString('ko-KR')}</p>
          <LikeIcon width={16} height={16} fill={'#459AFF'} />
        </div>
      </div>
    </li>
  );
};

export default CardS;
