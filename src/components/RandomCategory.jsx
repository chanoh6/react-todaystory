import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { StoriesSkeleton, TypeA, TypeB, TypeC } from 'components';
import { ArrowRightIcon } from 'assets';
import style from 'styles/Stories.module.css';

const fetchRandomCategory = async (api, idx, page) => {
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

const RandomCategory = React.memo((props) => {
  const { idx, name } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();

  const { data, error, isLoading } = useQuery(['randomCategoryStories', idx], () => fetchRandomCategory(api, idx, 1), {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    onError: (error) => console.error(error),
  });

  // if (loading || error || !data) return <StoriesSkeleton />;
  if (isLoading || error || !data) return null;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title} style={{ color: data.color }}>
          {/* {data.category} */}
          {name}
        </h1>
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
      <ul className={style.list}>{getRandomComponents(data.contents)}</ul>
    </>
  );
});

// getRandomCount 함수: 3~5 사이의 랜덤한 숫자 반환
const getRandomCount = () => Math.floor(Math.random() * (5 - 3 + 1)) + 3;

// getRandomComponents 함수: contents 배열을 받아서 랜덤한 컴포넌트 배열을 반환
const getRandomComponents = (contents) => {
  if (contents.length === 0) return null;

  const size = getRandomCount();
  const components = [];
  let typeCStarted = false;

  for (let i = 0; i < size; i++) {
    const content = contents[i];

    // if (i === 0 && Math.random() < 0.5 && !typeCStarted) {
    if (i === 0 && !typeCStarted) {
      components.push(<TypeA key={i} content={content} />);
    } else if (i < size - 1 && Math.random() < 0.5 && !typeCStarted) {
      components.push(<TypeB key={i} content={content} />);
      components.push(<TypeB key={i + 1} content={contents[i + 1]} />);
      i += 1;
    } else {
      typeCStarted = true;
      components.push(<TypeC key={i} content={content} />);
    }
  }

  return components;
};

export default RandomCategory;
