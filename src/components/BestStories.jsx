import React from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { StoriesSkeleton, TypeC } from 'components';
import style from 'styles/Stories.module.css';

const fetchBestStories = async (api, page, size) => {
  try {
    const response = await api.bestStories(page, size);
    if (response.code !== '0') {
      throw new Error(`API error: ${response.msg[process.env.REACT_APP_LOCALE]}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const BestStories = React.memo((props) => {
  const { page } = props;
  const { t } = useTranslation();
  const { api } = useAPI();
  const size = process.env.REACT_APP_BEST_STORIES_SIZE;

  const { data, error, isLoading } = useQuery(['bestStories', page], () => fetchBestStories(api, page, size), {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    onError: (error) => console.error(error),
  });

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
