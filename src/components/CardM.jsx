import { formatAgo } from '../utils/date';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';
import style from '../styles/CardM.module.css';

function CardM(props) {
  const { idx, thumbnail, logo, channel, title, categoryIdx, category, publishedAt, viewCount } = props.content;
  const baseURL = 'https://picks.my/ko/s/';
  const navigate = useNavigate();

  return (
    <li
      className={style.card}
      onClick={() => {
        navigate(`/view/${idx}`);
      }}
    >
      <figure className="thumbnail">
        <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="thumbnail" />
      </figure>
      <div className="card__title">
        <div className="cp">
          <img src={`${baseURL}cp/${logo}`} alt="cp logo" />
          <p>{channel}</p>
        </div>
        <p className="title">{title}</p>
      </div>
      <div className="card__more">
        <div className="date">
          <span id="publishedDate">{formatAgo(publishedAt, 'ko')}</span>
        </div>
        <div className="like">
          <img src="./assets/icon_like.svg" alt="icon like" />
        </div>
      </div>
    </li>
  );
}

export default CardM;
