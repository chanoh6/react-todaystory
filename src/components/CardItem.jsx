import style from '../styles/CardItem.module.css';

function CardItem(props) {
  return (
    <article className={`${style.card} ${style[props.type]}`}>
      <div className={style.card__info}>
        <figure className={style.thumbnail}>
          <img alt="thumbnail" />
        </figure>
        <div className={style.card__title}>
          <div className={style.cp}>
            <img src="./assets/icon_cplogo.svg" alt="cp logo" />
            <p>CHANNEL</p>
          </div>
          <p className={style.title}>TITLE</p>
        </div>
      </div>
      <div className={style.card__more}>
        <div className={style.date}>
          <span id="publishedDate">date</span>
          <span>|</span>
          <span id="contentCategory">category</span>
        </div>
        <div className={style.like}>
          <div className={style.view}>
            <img src="./assets/icon_view.svg" alt="icon view" />
            <p id="viewCount">12,345</p>
          </div>
          <img src="./assets/icon_like.svg" alt="icon like" />
        </div>
      </div>
    </article>
  );
}

export default CardItem;
