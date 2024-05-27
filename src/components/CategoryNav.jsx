import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import useFetchData from 'hooks/useFetchData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'swiper/css';
import style from 'styles/CategoryNav.module.css';

const CategoryNav = React.memo(({ curCategoryIdx }) => {
  const baseImgURL = process.env.REACT_APP_CATEGORY_ICON;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  // 현재 활성화된 슬라이드의 인덱스
  const [activeIndex, setActiveIndex] = useState(0);
  // Swiper 컴포넌트에 대한 참조
  const swiperRef = useRef(null);
  // 카테고리 데이터
  const { data, error, isLoading } = useFetchData(() => api.category(), 'category');

  // 아이콘 로딩 실패 시 대체 이미지로 교체
  const onErrorIcon = (e) => {
    e.target.onerror = null;
    e.target.src = process.env.REACT_APP_ERROR_ICON;
  };

  // 현재 카테고리 인덱스에 맞는 swipe 동작
  useEffect(() => {
    if (curCategoryIdx !== '' && swiperRef.current) {
      const index = data.findIndex((cat) => cat.idx === curCategoryIdx);
      if (index !== -1) {
        swiperRef.current.swiper.slideTo(index + 1); // 첫 번째 슬라이드는 'all'이므로 인덱스 + 1
        setActiveIndex(index + 1);
      }
    } else {
      setActiveIndex(0);
      if (swiperRef.current) {
        swiperRef.current.swiper.slideTo(0);
      }
    }
  }, [curCategoryIdx, data]);

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
      ref={swiperRef}
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
        className={`${style.item} ${activeIndex === 0 ? style.active : ''}`}
        onClick={() => navigate(process.env.REACT_APP_WEB_HOME_URL)}
      >
        <img loading="lazy" src={`${baseImgURL}all.svg`} alt="category icon" onError={onErrorIcon} />
        <p>{t(`nav.all`)}</p>
      </SwiperSlide>
      {data.map((cat, i) => (
        <SwiperSlide
          key={i}
          className={`${style.item} ${activeIndex === i + 1 ? style.active : ''}`}
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
