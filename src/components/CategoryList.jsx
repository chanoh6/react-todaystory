import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaystoryApi } from '../context/TodaystoryApiContext';
import style from '../styles/CategoryList.module.css';

function CategoryList() {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { todaystory } = useTodaystoryApi();
  const navigate = useNavigate();
  const baseImgURL = './assets/category/icon_';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setCategory(null);

      try {
        todaystory.categoryList().then((res) => setCategory(res));
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <ul className={style.list}>로딩중</ul>;
  if (error) return <ul className={style.list}>에러가 발생했습니다</ul>;
  if (!category) return null;
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
        {category.map((cat, i) => (
          <li
            key={i + 1}
            className={style.item}
            onClick={() => {
              navigate(`/${cat.idx}`);
            }}
          >
            <div className={style.icon}>
              <img src={`${baseImgURL}${cat.icon}`} alt="category icon" />
            </div>
            <p>{cat.name}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryList;
