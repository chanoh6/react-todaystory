import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { useAdContext } from 'context/AdContext';
import useFetchData from 'hooks/useFetchData';
import { CategoryNav, MenuButton, StoriesSkeleton } from 'components';
import { LuckIcon } from 'assets';
import style from 'styles/Home.module.css';
import adStyle from 'styles/Ad.module.css';
import AdInfeed from 'components/Ad/AdInfeed';

// React.lazy: 코드 스플리팅을 위한 함수 (Suspense와 함께 사용)
const TopStories = React.lazy(() => import('components/TopStories'));
const BestStories = React.lazy(() => import('components/BestStories'));
const EditorsPick = React.lazy(() => import('components/EditorsPick'));
const RandomCategory = React.lazy(() => import('components/RandomCategory'));

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const { isPWTLoaded } = useAdContext();
  // 홈 데이터
  const { data, error, isLoading } = useFetchData(() => api.home(), 'home');
  // 렌더링할 데이터
  const [renderData, setRenderData] = useState(null);
  // 현재 데이터 인덱스
  const [index, setIndex] = useState(0);
  // 더 불러올 데이터가 있는지 여부
  const [hasMore, setHasMore] = useState(true);
  // 광고 높이
  const { adHeight, setAdHeight } = useAdContext();
  const footerRef = useRef(null);
  const adAnchorRef = useRef(null);
  const date = t(`header.date`, {
    val: new Date(),
    formatParams: {
      val: { month: 'long', day: 'numeric' },
    },
  });
  let bestStoriesCount = 0;

  // 로고 클릭시 홈으로 이동
  const handleClickLogo = () => navigate(process.env.REACT_APP_WEB_HOME_URL);

  // 운세 클릭시 새 창으로 이동
  const handleClickFortune = () => window.open('http://s.sazoo.com/fortune/tarot.html');

  // 콘텐츠 타입에 따라 렌더링할 컴포넌트 반환
  const getContent = (item) => {
    switch (item.type) {
      case '1001':
        return <TopStories />;
      case '1002':
        bestStoriesCount += 1;
        return <BestStories page={bestStoriesCount} />;
      case '1003':
        return <EditorsPick comment={item.data} />;
      case '1004':
        return <RandomCategory idx={item.data} name={item.name} />;
      default:
        return null;
    }
  };

  // 무한 스크롤 기능
  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIndex((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore],
  );

  // 광고 로드
  const loadAd = (adUnitPath, adSizes, adSlotId) => {
    if (window.googletag && document.getElementById(adSlotId)) {
      window.googletag.cmd.push(function() {
        const existingSlot = window.googletag
        .pubads()
        .getSlots()
        .find((slot) => slot.getSlotElementId() === adSlotId);
        if (existingSlot) return;

        window.googletag.defineSlot(adUnitPath, adSizes, adSlotId).addService(window.googletag.pubads());
        window.googletag.display(adSlotId);
        // window.googletag.pubads().refresh();
      });
    }
  };

  useEffect(() => {
    if (!isPWTLoaded) return;
    loadAd(
      '/284705699/Samsung_life/Samsung_life_anchor', 
      [
        [320, 50],
        [320, 100],
      ], 
      'div-gpt-ad-1573457886200-0'
    );
    loadAd(
      '/284705699/Samsung_life/Samsung_KR_life_list_atf', 
      [
        [320, 100],
        [320, 50],
      ], 
      'div-gpt-ad-1613117118357-0'
    );
  }, [isPWTLoaded]);

  // 데이터 변경 시 렌더링 데이터 업데이트
  useEffect(() => {
    if (!data) return;
    setRenderData([data[0]]);
  }, [data]);

  // 인덱스 변경 시 렌더링 데이터 업데이트
  useEffect(() => {
    if (!data) return;

    index >= data.length ? setHasMore(false) : setHasMore(true);

    setRenderData((prev) => {
      if (!prev || index === 0) return [data[0]];
      return [...prev, ...data.slice(index, index + 1)];
    });
  }, [index]);

  // 광고 높이만큼 footer padding 추가
  useEffect(() => {
    if (!adHeight || !footerRef.current) return;
    footerRef.current.style.paddingBottom = `${adHeight}px`;
  }, [adHeight, setAdHeight]);

  return (
    <>
      <header className={style.header}>
        <hgroup className={style.logo}>
          <h1 onClick={handleClickLogo}>{t(`header.logo`)}</h1>
          <h2>{date}</h2>
        </hgroup>

        <div className={style.menu}>
          {/* <SearchButton /> */}
          <MenuButton />
        </div>
      </header>

      <nav className={style.nav}>
        <CategoryNav />
        <div className={style.nav__ad}>
          <button type="button" aria-label="ad_button" className={style.ad__item} onClick={handleClickFortune}>
            <LuckIcon width={18} height={20} fill="var(--color-black)" />
            <p>{t(`nav.fortune`)}</p>
          </button>
        </div>
      </nav>

      {/* /284705699/Samsung_life/Samsung_KR_life_list_atf */}
      <div className={adStyle.ad__home}>
        <div id="div-gpt-ad-1613117118357-0"></div>
      </div>

      <main>
        <Suspense fallback={<StoriesSkeleton />}>
          {renderData && (
            <>
              {renderData.map((item, index) => (
                <React.Fragment key={index}>
                  {index !== 0 && <AdInfeed index={index} />}
                  <section
                    key={index}
                    className={`${style.content__wrap} ${item.type === '1001' ? style.top : ''} ${
                      item.type === '1003' ? style.editors : ''
                    }
                    `}
                  >
                    {getContent(item)}
                  </section>
                </React.Fragment>
              ))}
              {hasMore && <section style={{ paddingTop: '30px' }} ref={lastItemRef}></section>}
            </>
          )}
        </Suspense>
      </main>

      <footer className={style.footer} ref={footerRef}>
        {/* /284705699/Samsung_life/Samsung_life_anchor */}
        <div className={adStyle.ad__anchor} ref={adAnchorRef}>
          <div id="div-gpt-ad-1573457886200-0"></div>
        </div>
      </footer>
    </>
  );
};

export default Home;
