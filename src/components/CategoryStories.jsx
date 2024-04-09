import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { NoStories, StoriesSkeleton, TypeC } from 'components';
import { ArrowRightIcon } from 'assets';
import style from 'styles/Stories.module.css';

const fetchCategoryStories = async (api, idx, page, size) => {
  const storageKey = `categoryStories-${idx}-${page}`;
  const storedData = localStorage.getItem(storageKey);
  const now = new Date().getTime();

  if (storedData) {
    const { lastFetched, data } = JSON.parse(storedData);
    const staleTime = 5 * 60 * 1000;

    if (now - lastFetched < staleTime) {
      return data;
    }
  }

  try {
    const response = await api.categoryStories(idx, page, 10);
    if (response.code !== '0') {
      throw new Error(`API error: ${response.msg[process.env.REACT_APP_LOCALE]}`);
    }
    const newData = response.data;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        lastFetched: now,
        data: newData,
      }),
    );

    return newData;
  } catch (error) {
    throw error;
  }
};

const CategoryStories = (props) => {
  const { idx, page } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const size = process.env.REACT_APP_CATEGORY_STORIES_SIZE;

  const { data, error, isLoading } = useQuery(
    ['categoryStories', idx],
    () => fetchCategoryStories(api, idx, page, size),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      onError: (error) => console.error(error),
    },
  );

  if (isLoading || error || !data) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title}>{data.category}</h1>
        <button
          type="button"
          aria-label="more_button"
          className={style.btn__more}
          onClick={() =>
            navigate(`${process.env.REACT_APP_WEB_CATEGORY_URL}${data.categoryIdx}`, {
              state: { title: data.category },
            })
          }
        >
          <p>{t(`main.more`)}</p>
          <ArrowRightIcon width={6} height={10} />
        </button>
      </div>
      <ul className={style.list}>
        {data.contents.slice(0, size).map((content, i) => (
          <TypeC key={i} content={content} />
        ))}
      </ul>
    </>
  );
};

export default CategoryStories;
