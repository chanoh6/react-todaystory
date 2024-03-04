import { useTranslation } from 'react-i18next';
import { useTopStories } from 'hooks/useContents';
import { StoriesSkeleton, TypeA, TypeB, TypeC } from 'components';
import style from 'styles/Stories.module.css';

function TopStories() {
  const { t } = useTranslation();
  const { loading, error, contents } = useTopStories();

  if (loading || error || !contents) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title}>{t(`main.top`)}</h1>
      </div>
      <ul className={style.list}>
        <TypeA key={0} content={contents[0]} />
        <TypeB key={1} content={contents[1]} />
        <TypeB key={2} content={contents[2]} />
        <TypeC key={3} content={contents[3]} />
        <TypeC key={4} content={contents[4]} />
        <TypeC key={5} content={contents[5]} />
      </ul>
    </>
  );
}

export default TopStories;
