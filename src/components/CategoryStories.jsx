import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategoryStories } from 'hooks/useStories';
import { StoriesSkeleton, TypeA, TypeB, TypeC } from 'components';
import { ArrowRightIcon } from 'assets';
import style from 'styles/Stories.module.css';

const getList = (list, contents) => {
  switch (list) {
    case 1:
      return (
        <>
          <TypeA key={0} content={contents[0]} />
          <TypeB key={1} content={contents[1]} />
          <TypeB key={2} content={contents[2]} />
          <TypeC key={3} content={contents[3]} />
        </>
      );
    case 2:
      return (
        <>
          <TypeA key={0} content={contents[0]} />
          <TypeC key={1} content={contents[1]} />
          <TypeC key={2} content={contents[2]} />
          <TypeC key={3} content={contents[3]} />
        </>
      );
    case 3:
      return (
        <>
          <TypeC key={0} content={contents[0]} />
          <TypeC key={1} content={contents[1]} />
          <TypeC key={2} content={contents[2]} />
          <TypeC key={3} content={contents[3]} />
        </>
      );
    default:
      return;
  }
};

function CategoryStories({ list, index }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading, error, category, contents } = useCategoryStories(index);

  if (loading || error || !contents) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title}>{category.current}</h1>
        <button
          className={style.btn__more}
          onClick={() => navigate(`/${index}`, { state: { title: category.current } })}
        >
          <p>{t(`main.more`)}</p>
          <ArrowRightIcon width={6} height={10} />
        </button>
      </div>
      <ul className={style.list}>{getList(list, contents)}</ul>
    </>
  );
}

export default CategoryStories;
