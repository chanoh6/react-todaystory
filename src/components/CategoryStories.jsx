import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategoryStories } from 'hooks/useStories';
import { NoStories, StoriesSkeleton, TypeC } from 'components';
import { ArrowRightIcon } from 'assets';
import style from 'styles/Stories.module.css';

const CategoryStories = (props) => {
  const { idx, page, size } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading, error, data } = useCategoryStories(idx, page, size);
  const { categoryIdx, category, color, contents } = data;

  if (loading || error || !contents) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title}>{category}</h1>
        <button
          className={style.btn__more}
          onClick={() =>
            navigate(`${process.env.REACT_APP_WEB_CATEGORY_URL}${categoryIdx}`, {
              state: { title: category.current },
            })
          }
        >
          <p>{t(`main.more`)}</p>
          <ArrowRightIcon width={6} height={10} />
        </button>
      </div>
      <ul className={style.list}>
      {contents.map((content, i) => (
        <TypeC key={i} content={content} />
      ))}
      </ul>
    </>
  );
};

export default CategoryStories;
