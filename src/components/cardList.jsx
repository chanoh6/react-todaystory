import style from '../styles/cardList.module.css';
import Card from './card';

function CardList(props) {
  let cardType = ['L', 'M', 'S'];
  let listType = [...props.type];
  let typeList = [];

  for (let i in cardType) {
    for (let j = 0; j < Number(listType[i]); j++) {
      typeList.push(cardType[i]);
    }
  }

  return (
    <div className={style.list__wrap}>
      <h1 className={style.title}>{props.title}</h1>
      <ul className={style.list}>
        {typeList.map((type, i) => (
          <Card key={i} type={type} />
        ))}
      </ul>
    </div>
  );
}

export default CardList;
