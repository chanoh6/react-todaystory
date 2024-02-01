import { formatAgo } from '../utils/date';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';
import style from '../styles/CardS.module.css';

function CardS(props) {
  const { idx, thumbnail, logo, channel, title, categoryIdx, category, publishedAt, viewCount } = props.content;
  const baseURL = 'https://picks.my/ko/s/';
  const navigate = useNavigate();

  return (
    <li
      className="card"
      onClick={() => {
        navigate(`/view/${idx}`);
      }}
    >
      <div className={style.card__info}>
        <div className={style.card__title}>
          <div className="cp">
            <img src={`${baseURL}cp/${logo}`} alt="cp logo" />
            <p>{channel}</p>
          </div>
          <p className="title">{title}</p>
        </div>
        <figure className={style.thumbnail}>
          <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="thumbnail" />
        </figure>
      </div>
      <div className="card__more">
        <div className="date">
          <span id="publishedDate">{formatAgo(publishedAt, 'ko')}</span>
          <span>|</span>
          <span id="contentCategory">{category}</span>
        </div>
        <div className="like">
          <div className="view">
            <img src="./assets/icon_view.svg" alt="icon view" />
            <p id="viewCount">{viewCount.toLocaleString('ko-KR')}</p>
          </div>
          <img src="./assets/icon_like.svg" alt="icon like" />
        </div>
      </div>
    </li>
  );
}

export default CardS;
