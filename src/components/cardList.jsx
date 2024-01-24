import style from '../styles/CardList.module.css';
import CardItem from './CardItem';

function CardList(props) {
  let cardType = ['l', 'm', 's'];
  let listType = [...props.type];
  let typeList = [];

  for (let i in cardType) {
    for (let j = 0; j < Number(listType[i]); j++) {
      typeList.push(cardType[i]);
    }
  }

  return (
    <section className={style.wrap}>
      <h1 className={style.title}>{props.title}</h1>
      <div className={style.list}>
        {typeList.map((type, i) => (
          <CardItem key={i} type={type} />
        ))}
      </div>
    </section>
  );
}

export default CardList;
