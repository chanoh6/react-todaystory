import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { useAdContext } from 'context/AdContext';
import { CategoryNav, MenuButton, StoriesSkeleton } from 'components';
import { LuckIcon } from 'assets';
import style from 'styles/Home.module.css';
import AdScript from 'components/Ad/AdScript';
import AnchorAd from 'components/Ad/AnchorAd';

/**
 * @TODOS
 * 1. footer 추가
 * 2. 아이콘 통합 정리
 */

// React.lazy: 코드 스플리팅을 위한 함수 (Suspense와 함께 사용)
// 상단 스토리
const TopStories = React.lazy(() => import('components/TopStories'));
// 베스트 스토리
const BestStories = React.lazy(() => import('components/BestStories'));
// 에디터 픽
const EditorsPick = React.lazy(() => import('components/EditorsPick'));
// 랜덤 카테고리
const RandomCategory = React.lazy(() => import('components/RandomCategory'));

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [renderData, setRenderData] = useState(null); // 렌더링할 data
  const [index, setIndex] = useState(0); // 현재 data index
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const { adHeight } = useAdContext();
  const footerRef = useRef(null);
  const date = t(`header.date`, {
    val: new Date(),
    formatParams: {
      val: { month: 'long', day: 'numeric' },
    },
  });
  let bestStoriesCount = 0;

  // 로고 클릭시 홈으로 이동
  const handleClickLogo = () => navigate(process.env.REACT_APP_WEB_HOME_URL);

  // 운세 클릭시 새창으로 이동
  const handleClickFortune = () => window.open('http://s.sazoo.com/fortune/tarot.html');

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.home();
      return res;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIndex((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  // API 호출 및 초기 data 세팅
  useEffect(() => {
    fetchData().then((res) => {
      if (res.code === '0') {
        setData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (!data) return;
    setIndex(0);
    setRenderData([data[0]]);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    index >= data.length ? setHasMore(false) : setHasMore(true);

    setRenderData((prev) => {
      if (!prev) return [data.slice(0, index)];
      return [...prev, ...data.slice(index, index + 1)];
    });
  }, [index]);

  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.style.paddingBottom = `${adHeight}px`;
    }
  }, [adHeight, footerRef.current]);

  return (
    <>
      <AdScript />
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

      <main>
        <Suspense fallback={<StoriesSkeleton />}>
          {renderData && (
            <>
              {renderData.map((item, index) => (
                <section
                  key={index}
                  className={`${style.content__wrap} ${item.type === '1001' ? style.top : ''} ${
                    item.type === '1003' ? style.editors : ''
                  }
                  `}
                >
                  {(() => {
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
                  })()}
                </section>
              ))}
              {hasMore && <section style={{ paddingTop: '30px' }} ref={lastItemRef}></section>}
            </>
          )}
        </Suspense>
      </main>

      <footer className={style.footer} ref={footerRef}></footer>
    </>
  );
};

export default Home;
