import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import useFetchData from 'hooks/useFetchData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import style from 'styles/CategoryNav.module.css';
import Skeleton from 'react-loading-skeleton';

const CategoryNav = React.memo(() => {
  const baseImgURL = process.env.REACT_APP_CATEGORY_ICON;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  // 카테고리 데이터
  const { data, error, isLoading } = useFetchData(() => api.category(), 'category');

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
      freeMode={false}
      preventClicks={true}
      preventClicksPropagation={true}
      grabCursor={true}
      roundLengths={true}
      speed={500}
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
