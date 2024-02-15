import { useNavigate } from 'react-router-dom';
import { formatAgo } from 'utils/date';
import 'styles/Card.css';
import style from 'styles/CardM.module.css';
import { ReactComponent as LikeIcon } from 'assets/icon/LikeUnfilled.svg';

const onErrorImg = (e) => (e.target.src = '/assets/no_image.png');

const CardM = ({ content }) => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_IMG_URL;
  const { idx, thumbnail, logo, channel, title, publishedAt } = content;

  return (
    <li className={style.card} onClick={() => navigate(`/view/${idx}`, { state: { content } })}>
      <figure className="thumbnail">
        <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="thumbnail" onError={onErrorImg} />
      </figure>
      <div className={style.card__title}>
        <div className="cp">
          <img src={`${baseURL}cp/${logo}`} alt="cp logo" onError={onErrorImg} />
          <p>{channel}</p>
        </div>
        <p className="title">{title}</p>
      </div>
      <div className="card__more">
        <span id="publishedAt">{formatAgo(publishedAt, 'ko')}</span>
        <LikeIcon width={16} height={16} fill={'var(--color-blue)'} />
      </div>
    </li>
  );
};

export default CardM;
