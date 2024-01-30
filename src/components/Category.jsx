import style from '../styles/Category.module.css';

// dummy
import category from '../json/category.json';
import { Link } from 'react-router-dom';

function Category() {
  const baseURL = './assets/category/icon_';
  let cateList = [];
  cateList = category.data;

  return (
    <nav>
      <ul className={style.list}>
        <li className={style.item}>
          <Link to={'/'}>
            <img src={`${baseURL}all.svg`} alt="category icon" />
            <p>전체보기</p>
          </Link>
        </li>
        {cateList.map((cate, i) => (
          <li key={i + 1} className={style.item}>
            <Link to={`/${cate.idx}`}>
              <div className={style.icon}>
                <img src={`${baseURL}${cate.icon}`} alt="category icon" />
              </div>
              <p>{cate.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Category;
