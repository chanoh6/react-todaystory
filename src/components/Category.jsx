import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategory } from 'hooks/useStories';
import style from 'styles/Category.module.css';
import Skeleton from 'react-loading-skeleton';

const Category = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading, error, data } = useCategory();
  const baseImgURL = process.env.REACT_APP_CATEGORY_ICON;

  const onErrorIcon = (e) => (e.target.src = process.env.REACT_APP_ERROR_ICON);

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

export default Category;
