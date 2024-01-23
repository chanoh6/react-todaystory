import style from '../styles/card.module.css';
import styleM from '../styles/cardM.module.css';
import styleS from '../styles/cardS.module.css';

function Card(props) {
  let card = cardType(props.type);

  return card;
}

const cardType = (type) => {
  let result = '';
  switch (type) {
    case 'L':
      result = (
        <li className={style.card}>
          <div className={style.card__image}></div>
          <div className={style.card__info}>
            <div className={style.cp}>
              <div className={style.cp__logo}></div>
              <p className={style.cp__name}>LABEL</p>
            </div>
            <p className={style.title}>TITLE</p>
          </div>
          <div className={style.more}>
            <div className={style.more__left}>
              <span id="publishedDate">date</span>
              <span>|</span>
              <span id="contentCategory">category</span>
            </div>
            <div className={style.more__right}>
              <div className={style.view}>
                <div className={style.icon__view}></div>
                <p>view</p>
              </div>
              <div className={style.btn__like}></div>
            </div>
          </div>
        </li>
      );
      break;
    case 'M':
      result = (
        <li className={styleM.card}>
          <div className={style.card__image}></div>
          <div className={style.card__info}>
            <div className={style.cp}>
              <div className={style.cp__logo}></div>
              <p className={style.cp__name}>LABEL</p>
            </div>
            <p className={style.title}>TITLE</p>
          </div>
          <div className={style.more}>
            <div className={style.more__left}>
              <span id="publishedDate">date</span>
            </div>
            <div className={style.more__right}>
              <div className={style.btn__like}></div>
            </div>
          </div>
        </li>
      );
      break;
    case 'S':
      result = (
        <li className={style.card}>
          <div className={styleS.card__info}>
            <div className={styleS.card__text}>
              <div className={style.cp}>
                <div className={style.cp__logo}></div>
                <p className={style.cp__name}>LABEL</p>
              </div>
              <p className={style.title}>TITLE</p>
            </div>
            <div className={styleS.card__image}></div>
          </div>
          <div className={style.more}>
            <div className={style.more__left}>
              <span id="publishedDate">date</span>
              <span>|</span>
              <span id="contentCategory">category</span>
            </div>
            <div className={style.more__right}>
              <div className={style.view}>
                <div className={style.icon__view}></div>
                <p>view</p>
              </div>
              <div className={style.btn__like}></div>
            </div>
          </div>
        </li>
      );
      break;
    default:
      break;
  }

  return result;
};

export default Card;
