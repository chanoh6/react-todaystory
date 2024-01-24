import style from '../styles/CategoryItem.module.css';

function CategoryItem(props) {
  return (
    <li className={style.item}>
      <div className={style.icon}>
        <img src="./assets/icon_category.svg" alt="category icon" />
      </div>
      <p>{props.title}</p>
    </li>
  );
}

export default CategoryItem;
