import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import style from 'styles/CategoryNav.module.css';
import Skeleton from 'react-loading-skeleton';

const fetchCategory = async (api) => {
  const storageKey = `category`;
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
    const response = await api.category();
    if (response.code !== '0') {
      throw new Error(`API error: ${response.msg[process.env.REACT_APP_LOCALE]}`);
    }
    const newData = response.data;
    
    localStorage.setItem(storageKey, JSON.stringify({
      lastFetched: now,
      data: newData
    }));

    return newData;
  } catch (error) {
    throw error;
  }
};

const CategoryNav = React.memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const baseImgURL = process.env.REACT_APP_CATEGORY_ICON;

  const { data, error, isLoading } = useQuery('category', () => fetchCategory(api), {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    onError: (error) => console.error(error),
  });

  const onErrorIcon = (e) => (e.target.src = process.env.REACT_APP_ERROR_ICON);

  if (isLoading || error || !data) {
    return (
      <ul className={style.list__skeleton}>
        {new Array(10).fill(1).map((_, i) => (
          <Skeleton key={i} width={'100px'} className={style.item__skeleton} />
        ))}
      </ul>
    );
  }

  return (
    <Swiper
      className={style.list}
      modules={[FreeMode]}
      spaceBetween={8}
      slidesPerView={'auto'}
      freeMode={true}
      preventClicks={true}
      preventClicksPropagation={true}
      grabCursor={true}
      roundLengths={true}
    >
      <SwiperSlide
        className={`${style.item} ${style.active}`}
        onClick={() => navigate(process.env.REACT_APP_WEB_HOME_URL)}
      >
        <img loading="lazy" src={`${baseImgURL}all.svg`} alt="category icon" onError={onErrorIcon} />
        <p>{t(`nav.all`)}</p>
      </SwiperSlide>
      {data.map((cat, i) => (
        <SwiperSlide
          key={i}
          className={style.item}
          onClick={() =>
            navigate(`${process.env.REACT_APP_WEB_CATEGORY_URL}${cat.idx}`, { state: { title: cat.name } })
          }
        >
          <figure className={style.icon}>
            <img loading="lazy" src={`${baseImgURL}${cat.icon}`} alt="category icon" onError={onErrorIcon} />
          </figure>
          <p>{cat.name}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

export default CategoryNav;
