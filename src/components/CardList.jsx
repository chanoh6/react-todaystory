import style from '../styles/CardList.module.css';
import CardL from '../components/CardL';
import CardM from '../components/CardM';
import CardS from '../components/CardS';

function CardList(props) {
  const { contents } = props;

  return (
    <>
      <ul className={style.list}>
        <CardL key={0} content={contents[0]} />
        <CardM key={1} content={contents[1]} />
        <CardM key={2} content={contents[2]} />
        <CardS key={3} content={contents[3]} />
        <CardS key={4} content={contents[4]} />
        <CardS key={5} content={contents[5]} />
      </ul>
    </>
  );
}

export default CardList;
