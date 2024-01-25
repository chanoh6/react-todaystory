import style from '../styles/CardEditor.module.css';
import CardItem from './CardItem';

function CardEditor(props) {
  return (
    <section className={style.wrap}>
      <hgroup className={style.title__wrap}>
        <h1>{props.title}</h1>
        <h2>subtitle</h2>
      </hgroup>
      <CardItem type="e" />
    </section>
  );
}

export default CardEditor;
