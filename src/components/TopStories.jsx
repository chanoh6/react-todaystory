import React from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { StoriesSkeleton, TypeA, TypeB, TypeC } from 'components';
import style from 'styles/Stories.module.css';

const fetchTopStories = async (api, size) => {
  try {
    const response = await api.topStories(size);
    if (response.code !== '0') {
      throw new Error(`API error: ${response.msg[process.env.REACT_APP_LOCALE]}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const TopStories = React.memo(() => {
  const { t } = useTranslation();
  const { api } = useAPI();
  const size = process.env.REACT_APP_TOP_STORIES_SIZE;

  const { data, error, isLoading } = useQuery('topStories', () => fetchTopStories(api, size), {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    onError: (error) => console.error(error),
  });

  if (isLoading || error || !data) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title} style={{ color: `var(--color-dark-blue)` }}>
          {t(`main.top`)}
        </h1>
      </div>
      <ul className={style.list}>
        {data.contents.map((content, i) => {
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
});

export default TopStories;
