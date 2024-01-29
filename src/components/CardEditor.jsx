import '../styles/Card.css';
import style from '../styles/CardEditor.module.css';

function CardEditor() {
  return (
    <section className={style.wrap}>
      <hgroup className={style.title__wrap}>
        <h1>editor's pick</h1>
        <h2>subtitle</h2>
      </hgroup>
      <article className={style.card}>
        <div className={style.card__img}>
          <figure className={style.thumbnail}>
            <img alt="thumbnail" />
          </figure>
          <figure className={style.background}>
            <img alt="background" />
          </figure>
        </div>
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
            <span>|</span>
            <span id="contentCategory">category</span>
          </div>
          <div className="like">
            <div className="view">
              <img src="./assets/icon_view.svg" alt="icon view" />
              <p id="viewCount">12,345</p>
            </div>
            <img src="./assets/icon_like.svg" alt="icon like" />
          </div>
        </div>
      </article>
    </section>
  );
}

export default CardEditor;
