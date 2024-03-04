import { useTranslation } from 'react-i18next';
import { useBestStories } from 'hooks/useContents';
import { StoriesSkeleton, TypeC } from 'components';
import style from 'styles/Stories.module.css';

function BestStories({ start }) {
  const { t } = useTranslation();
  const { loading, error, contents } = useBestStories(start);

  if (loading || error || !contents) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title}>{t(`main.best`)}</h1>
      </div>
      <ul className={style.list}>
        {contents.map((content, i) => (
          <TypeC key={i} content={content} />
        ))}
      </ul>
    </>
  );
}

export default BestStories;
