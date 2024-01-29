import '../styles/Card.css';
import style from '../styles/CardM.module.css';

function CardM() {
  return (
    <li className={style.card}>
      <figure className="thumbnail">
        <img src="./assets/no_image.png" alt="thumbnail" />
      </figure>
      <div className="card__title">
        <div className="cp">
          <img src="./assets/icon_cplogo.svg" alt="cp logo" />
          <p>CHANNEL</p>
        </div>
        <p className="title">TITLE</p>
      </div>
      <div className="card__more">
        <div className="date">
          <span id="publishedDate">date</span>
        </div>
        <div className="like">
          <img src="./assets/icon_like.svg" alt="icon like" />
        </div>
      </div>
    </li>
  );
}

export default CardM;
