import { formatAgo } from '../utils/date';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';
import { ReactComponent as LikeIcon } from '../assets/icon/Like.svg';
import { ReactComponent as ViewIcon } from '../assets/icon/View.svg';

const onErrorImg = (e) => (e.target.src = '/assets/no_image.png');

const CardL = ({ content }) => {
  const navigate = useNavigate();
  const baseURL = 'https://picks.my/ko/s/';
  const { idx, thumbnail, logo, channel, title, category, publishedAt, viewCount } = content;

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

export default CardL;
