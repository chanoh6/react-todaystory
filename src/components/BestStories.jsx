import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import useFetchData from 'hooks/useFetchData';
import { StoriesSkeleton, TypeC } from 'components';
import style from 'styles/Stories.module.css';

const BestStories = React.memo((props) => {
  const size = process.env.REACT_APP_BEST_STORIES_SIZE;
  const { page } = props;
  const { t } = useTranslation();
  const { api } = useAPI();
  // 베스트스토리 데이터
  const { data, error, isLoading } = useFetchData(() => api.bestStories(page, size), `bestStories-${page}`);

  if (isLoading || error || !data) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title}>{t(`main.best`)}</h1>
      </div>
      <ul className={style.list}>
        {data.contents.map((content, i) => (
          <TypeC key={i} content={content} />
        ))}
      </ul>
    </>
  );
});

export default BestStories;
