import { useCard } from 'hooks/useCard';
import { LikeButton } from 'components';
import 'styles/Card.css';

const TypeA = (props) => {
  const { content } = props;
  const { idx, category, cp, title, thumbnail, logo, publishDate, viewCount, handleClick, onErrorImg, onErrorLogo } =
    useCard(content);

  return (
    <li data-idx={idx} className="card" onClick={handleClick}>
      <figure className="thumbnail">
        <img loading="lazy" src={thumbnail} alt="thumbnail" onError={onErrorImg} />
      </figure>
      <div className="card__title">
        <div className="cp">
          <img loading="lazy" src={logo} alt="cp logo" onError={onErrorLogo} />
          <p>{cp}</p>
        </div>
        <p className="title">{title}</p>
      </div>
      <div className="card__more">
        <span id="publishedAt">{publishDate}</span>
        <LikeButton idx={idx} />
      </div>
    </li>
  );
};

export default TypeA;
