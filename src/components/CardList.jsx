import style from '../styles/CardList.module.css';
import CardL from '../components/CardL';
import CardM from '../components/CardM';
import CardS from '../components/CardS';

const getList = (type, contents) => {
  let result = '';

  switch (type) {
    case 1:
      result = (
        <>
          <CardL key={0} content={contents[0]} />
          <CardM key={1} content={contents[1]} />
          <CardM key={2} content={contents[2]} />
          <CardS key={3} content={contents[3]} />
          <CardS key={4} content={contents[4]} />
          <CardS key={5} content={contents[5]} />
        </>
      );
      break;
    case 2:
      result = (
        <>
          <CardL key={0} content={contents[0]} />
          <CardM key={1} content={contents[1]} />
          <CardM key={2} content={contents[2]} />
          <CardS key={3} content={contents[3]} />
        </>
      );
      break;
    case 3:
      result = (
        <>
          <CardL key={0} content={contents[0]} />
          <CardS key={1} content={contents[1]} />
          <CardS key={2} content={contents[2]} />
          <CardS key={3} content={contents[3]} />
        </>
      );
      break;
    case 4:
      result = (
        <>
          <CardS key={0} content={contents[0]} />
          <CardS key={1} content={contents[1]} />
          <CardS key={2} content={contents[2]} />
          <CardS key={3} content={contents[3]} />
        </>
      );
      break;
    default:
      break;
  }

  return result;
};

function CardList(props) {
  const { type, contentType } = props;
  const contents = require(`../json/${contentType}.json`).data;

  return <ul className={style.list}>{getList(type, contents)}</ul>;
}

export default CardList;
