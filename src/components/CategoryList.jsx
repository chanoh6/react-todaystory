import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaystoryApi } from '../context/TodaystoryApiContext';
import style from '../styles/CategoryList.module.css';
import Skeleton from 'react-loading-skeleton';

function CategoryList() {
  const { todaystory } = useTodaystoryApi();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseImgURL = './assets/category/icon_';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setCategory(null);

      try {
        return todaystory.categoryList();
      } catch (e) {
        setError(e);
      }
    };

    fetchData().then((res) => {
      setCategory(res);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  }, []);

  if (loading || error || !category) {
    return (
      <ul className={style.list}>
        {new Array(10).fill(1).map((_, i) => (
          <Skeleton key={i} width={'100px'} className={style.item} />
        ))}
      </ul>
    );
  }

  return (
    <ul className={style.list}>
      <li key={0} className={`${style.item} ${style.active}`} onClick={() => navigate('/')}>
        <img src={`${baseImgURL}all.svg`} alt="category icon" />
        <p>전체보기</p>
      </li>
      {category.map((cat, i) => (
        <li key={i + 1} className={style.item} onClick={() => navigate(`/${cat.idx}`, { state: { title: cat.name } })}>
          <figure className={style.icon}>
            <img src={`${baseImgURL}${cat.icon}`} alt="category icon" />
          </figure>
          <p>{cat.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
