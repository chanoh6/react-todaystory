import style from '../styles/Category.module.css';

// dummy
import categoryData from '../json/category.json';

function Category() {
  const baseURL = './assets/';
  let cateList = [];
  cateList = categoryData.data;

  return (
    <nav>
      <ul className={style.list}>
        <li className={style.item}>
          <div className={style.icon}>
            <img src={`${baseURL}icon_category.svg`} alt="category icon" />
          </div>
          <p>전체보기</p>
        </li>
        {cateList.map((cate, i) => (
          <li key={i + 1} className={style.item}>
            <div className={style.icon}>
              <img src={baseURL + cate.icon} alt="category icon" />
            </div>
            <p>{cate.name}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Category;
