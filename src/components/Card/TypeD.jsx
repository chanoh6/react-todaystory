import { useNavigate } from "react-router-dom";
import { formatAgo } from "utils/date";
import { LikeButton } from "components";
import { ViewIcon } from "assets";
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';


const TypeD = ({ content }) => {
  const navigate = useNavigate();
  const locale = process.env.REACT_APP_LOCALE;
  const baseURL = process.env.REACT_APP_BASE_IMG_URL;
  const { idx, thumbnail, logo, channel, title, category, publishedAt, viewCount } = content;

  return (
    <article className={style.card} onClick={() => navigate(`/view/${idx}`, { state: { content } })}>
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
          <span id="publishedAt">{formatAgo(publishedAt, locale)}</span>
          <span>|</span>
          <span id="category">{category}</span>
        </div>
        <div className="like">
          <ViewIcon width={16} height={16} fill={'var(--color-blue)'} />
          <p id="viewCount">{viewCount}</p>
          <LikeButton idx={idx}/>
        </div>
      </div>
    </article>
  );
}

export default TypeD;
