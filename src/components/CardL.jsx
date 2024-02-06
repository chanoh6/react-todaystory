import { formatAgo } from '../utils/date';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';
import { ReactComponent as LikeIcon } from '../assets/icon/Like.svg';
import { ReactComponent as ViewIcon } from '../assets/icon/View.svg';

const onErrorImg = (e) => {
  e.target.src = '/assets/no_image.png';
};

const CardL = ({ content }) => {
  const { idx, thumbnail, logo, channel, title, categoryIdx, category, publishedAt, viewCount } = content;
  const baseURL = 'https://picks.my/ko/s/';
  const navigate = useNavigate();

  return (
    <li data-idx={idx} className="card" onClick={() => navigate(`/view/${idx}`, { state: { content: content } })}>
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
          <span id="publishedDate">{formatAgo(publishedAt, 'ko')}</span>
          <span>|</span>
          <span id="contentCategory">{category}</span>
        </div>
        <div className="like">
          <div className="view">
            <ViewIcon width={16} height={16} fill={'#459AFF'} />
            <p id="viewCount">{viewCount.toLocaleString('ko-KR')}</p>
          </div>
          <LikeIcon width={16} height={16} fill={'#459AFF'} />
        </div>
      </div>
    </li>
  );
};

export default CardL;
