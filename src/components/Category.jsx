import { useNavigate } from 'react-router-dom';
import style from '../styles/Category.module.css';

// dummy
import category from '../json/category.json';

function Category() {
  const navigate = useNavigate();
  const baseImgURL = './assets/category/icon_';
  const cateList = category.data;

  return (
    <nav>
      <ul className={style.list}>
        <li
          key={0}
          className={`${style.item} ${style.active}`}
          onClick={() => {
            navigate('/');
          }}
        >
          <img src={`${baseImgURL}all.svg`} alt="category icon" />
          <p>전체보기</p>
        </li>
        {cateList.map((cate, i) => (
          <li
            key={i + 1}
            className={style.item}
            onClick={() => {
              navigate(`/${cate.idx}`);
            }}
          >
            <div className={style.icon}>
              <img src={`${baseImgURL}${cate.icon}`} alt="category icon" />
            </div>
            <p>{cate.name}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Category;
