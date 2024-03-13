import { useTranslation } from 'react-i18next';
import { useBestStories } from 'hooks/useStories';
import { StoriesSkeleton, TypeC } from 'components';
import style from 'styles/Stories.module.css';

const BestStories = (props) => {
  const { page, size } = props;
  const { t } = useTranslation();
  const { loading, error, data } = useBestStories(page, size);
  const { contents } = data;

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
};

export default BestStories;
