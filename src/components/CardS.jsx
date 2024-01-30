import { Link } from 'react-router-dom';
import '../styles/Card.css';
import style from '../styles/CardS.module.css';

function CardS(props) {
  const baseURL = 'https://picks.my/ko/s/';
  let { content } = props;
  let { idx, thumbnail, logo, channel, title, categoryIdx, category, publishedDate, viewCount } = content;

  return (
    <li className="card">
      <Link to={`/view/${idx}`}>
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
            <span id="publishedDate">{publishedDate}</span>
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
      </Link>
    </li>
  );
}

export default CardS;
