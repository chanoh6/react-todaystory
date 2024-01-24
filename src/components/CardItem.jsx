import style from '../styles/CardItem.module.css';

function CardItem(props) {
  return (
    <article className={`${style.item} ${style[props.type]}`}>
      <div className={style.info}>
        <div className={style.img__wrap}>
          <figure className={style.thumbnail}>
            <img alt="thumbnail" />
          </figure>
          <figure className={style.background}>
            <img alt="background" />
          </figure>
        </div>
        <div className={style.title__wrap}>
          <div className={style.cp}>
            <div className={style.cp__logo}>
              <img src="./assets/img_cplogo.svg" alt="cp logo" />
            </div>
            <p className={style.cp__name}>CHANNEL</p>
          </div>
          <p className={style.title}>TITLE</p>
        </div>
      </div>
      <div className={style.more}>
        <div className={style.date__wrap}>
          <span id="publishedDate">date</span>
          <span>|</span>
          <span id="contentCategory">category</span>
        </div>
        <div className={style.like__wrap}>
          <div className={style.like}>
            <div className={style.like__icon}>
              <img src="./assets/icon_view.svg" alt="icon view" />
            </div>
            <p>12,345</p>
          </div>
          <div className={style.like__icon}>
            <img src="./assets/icon_like.svg" alt="icon like" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default CardItem;
