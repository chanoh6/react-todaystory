import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import style from 'styles/CategoryNav.module.css';
import Skeleton from 'react-loading-skeleton';

const CategoryNav = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const baseImgURL = process.env.REACT_APP_CATEGORY_ICON;

  const onErrorIcon = (e) => (e.target.src = process.env.REACT_APP_ERROR_ICON);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await api.category();
      return res;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then((res) => {
      if (res.code === '0') {
        setData(res.data);
      } else {
        console.log(`API error: ${res.msg[process.env.REACT_APP_LOCALE]}`);
      }
    });
  }, []);

  if (loading || error || !data) {
    return (
      <ul className={style.list}>
        {new Array(10).fill(1).map((_, i) => (
          <Skeleton key={i} width={'100px'} className={style.item__skeleton} />
        ))}
      </ul>
    );
  }

  return (
    <ul className={style.list}>
      <li
        key={0}
        className={`${style.item} ${style.active}`}
        onClick={() => navigate(process.env.REACT_APP_WEB_HOME_URL)}
      >
        <img loading="lazy" src={`${baseImgURL}all.svg`} alt="category icon" onError={onErrorIcon} />
        <p>{t(`nav.all`)}</p>
      </li>
      {data.map((cat, i) => (
        <li
          key={i}
          className={style.item}
          onClick={() =>
            navigate(`${process.env.REACT_APP_WEB_CATEGORY_URL}${cat.idx}`, { state: { title: cat.name } })
          }
        >
          <figure className={style.icon}>
            <img loading="lazy" src={`${baseImgURL}${cat.icon}`} alt="category icon" onError={onErrorIcon} />
          </figure>
          <p>{cat.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default CategoryNav;
