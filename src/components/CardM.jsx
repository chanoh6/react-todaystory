import { Link } from 'react-router-dom';
import '../styles/Card.css';
import style from '../styles/CardM.module.css';

function CardM(props) {
  const baseURL = 'https://picks.my/ko/s/';
  let { content } = props;
  let { idx, thumbnail, logo, channel, title, categoryIdx, category, publishedDate, viewCount } = content;

  return (
    <li className={style.card}>
      <Link to={`/view/${idx}`}>
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
            <span id="publishedDate">{publishedDate}</span>
          </div>
          <div className="like">
            <img src="./assets/icon_like.svg" alt="icon like" />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default CardM;
