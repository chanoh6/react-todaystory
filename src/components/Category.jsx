import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext_';
import style from 'styles/Category.module.css';
import Skeleton from 'react-loading-skeleton';

function Category() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseImgURL = process.env.REACT_APP_CATEGORY_ICON;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setCategory(null);

      try {
        return api.categoryList();
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
        <p>{t(`nav.all`)}</p>
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

export default Category;
