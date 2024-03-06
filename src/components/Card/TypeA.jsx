import { useCard } from 'hooks/useCard';
import { LikeButton } from 'components';
import { ViewIcon } from 'assets';
import 'styles/Card.css';

const TypeA = ({ content }) => {
  const { idx, category, channel, title, thumbnail, logo, publishedAt, viewCount, handleClick, onErrorImg } =
    useCard(content);

  return (
    <li data-idx={idx} className="card" onClick={handleClick}>
      <figure className="thumbnail">
        <img src={thumbnail} alt="thumbnail" onError={onErrorImg} />
      </figure>
      <div className="card__title">
        <div className="cp">
          <img src={logo} alt="cp logo" onError={onErrorImg} />
          <p>{channel}</p>
        </div>
        <p className="title">{title}</p>
      </div>
      <div className="card__more">
        <div className="date">
          <span id="publishedAt">{publishedAt}</span>
          <span>|</span>
          <span id="category">{category}</span>
        </div>
        <div className="like">
          <ViewIcon width={16} height={16} />
          <p id="viewCount">{viewCount}</p>
          <LikeButton idx={idx} />
        </div>
      </div>
    </li>
  );
};

export default TypeA;
