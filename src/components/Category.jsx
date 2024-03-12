import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategory } from 'hooks/useStories';
import style from 'styles/Category.module.css';
import Skeleton from 'react-loading-skeleton';

/**
 * @TODOS
 * 카테고리 아이콘 s3 업로드
 */

function Category() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading, error, data } = useCategory();
  const baseImgURL = process.env.REACT_APP_CATEGORY_ICON;

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
        <img src={`${baseImgURL}all.svg`} alt="category icon" />
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
            <img src={`${baseImgURL}${cat.icon}`} alt="category icon" />
          </figure>
          <p>{cat.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default Category;
