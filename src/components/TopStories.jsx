import { useTranslation } from 'react-i18next';
import { useTopStories } from 'hooks/useStories';
import { StoriesSkeleton, TypeA, TypeB, TypeC } from 'components';
import style from 'styles/Stories.module.css';

const TopStories = (props) => {
  const { size } = props;
  const { t } = useTranslation();
  const { loading, error, data } = useTopStories(size);
  const { contents } = data || {};

  if (loading || error || !contents) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title} style={{ color: `var(--color-dark-blue)` }}>
          {t(`main.top`)}
        </h1>
      </div>
      <ul className={style.list}>
        {contents.map((content, i) => {
          if (i === 0) {
            return <TypeA key={i} content={content} />;
          } else if (i === 1 || i === 2) {
            return <TypeB key={i} content={content} />;
          } else {
            return <TypeC key={i} content={content} />;
          }
        })}
      </ul>
    </>
  );
};

export default TopStories;
