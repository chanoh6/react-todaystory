import style from 'styles/NoStories.module.css';

const NoStories = (props) => {
  const { text } = props;
  return (
    <div className={style.content__wrap}>
      <p>{text}</p>
    </div>
  );
};

export default NoStories;
