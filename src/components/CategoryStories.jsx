import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import useFetchData from 'hooks/useFetchData';
import { StoriesSkeleton, TypeC } from 'components';
import { ArrowRightIcon } from 'assets';
import style from 'styles/Stories.module.css';

const CategoryStories = (props) => {
  const size = process.env.REACT_APP_CATEGORY_STORIES_SIZE;
  const { idx, page } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  // 카테고리 스토리 데이터
  const { data, error, isLoading } = useFetchData(
    () => api.categoryStories(idx, page, 10),
    `categoryStories-${idx}-${page}`,
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
