import { Link } from 'react-router-dom';
import '../styles/Card.css';
import style from '../styles/CardEditor.module.css';

// dummy
import editorsPick from '../json/editorsPick.json';

function CardEditor() {
  const baseURL = 'https://picks.my/ko/s/';
  let { idx, thumbnail, logo, channel, title, categoryIdx, category, publishedDate, viewCount } = editorsPick.data;

  return (
    <article className={style.card}>
      <Link to={`/view/${idx}`}>
        <div className={style.card__img}>
          <figure className={style.thumbnail}>
            <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="thumbnail" />
          </figure>
          <figure className={style.background}>
            <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="background" />
          </figure>
        </div>
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
            <span>|</span>
            <span id="contentCategory">{category}</span>
          </div>
          <div className="like">
            <div className="view">
              <img src="./assets/icon_view.svg" alt="icon view" />
              <p id="viewCount">12,345</p>
            </div>
            <img src="./assets/icon_like.svg" alt="icon like" />
          </div>
        </div>
      </Link>
    </article>
  );
}

export default CardEditor;
