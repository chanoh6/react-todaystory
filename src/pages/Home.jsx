import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CategoryNav, MenuButton, StoriesSkeleton } from 'components';
import { LuckIcon } from 'assets';
import style from 'styles/Home.module.css';

/**
 * @TODOS
 * 1. 상단 카테고리 swiper 적용
 * 2. 홈 화면 무한 스크롤 구현
 * 3. footer 추가
 * 4. 아이콘 통합 정리
 * 5. 에디터 픽 스타일
 */

// React.lazy: 코드 스플리팅을 위한 함수 (Suspense와 함께 사용)
const TopStories = React.lazy(() => import('components/TopStories'));
const BestStories = React.lazy(() => import('components/BestStories'));
const EditorsPick = React.lazy(() => import('components/EditorsPick'));
const RandomCategory = React.lazy(() => import('components/RandomCategory'));

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const date = t(`header.date`, {
    val: new Date(),
    formatParams: {
      val: { month: 'long', day: 'numeric' },
    },
  });

  // logo 클릭시 홈으로 이동
  const handleClickLogo = () => navigate(process.env.REACT_APP_WEB_HOME_URL);

  // 운세 클릭시 새창으로 이동
  const handleClickFortune = () => window.open('http://s.sazoo.com/fortune/tarot.html');

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

      <main>
        <Suspense fallback={<StoriesSkeleton />}>
          <section className={`${style.content__wrap} ${style.top}`}>
            <TopStories />
          </section>

          <section className={style.content__wrap}>
            <BestStories page={1} />
          </section>

          <EditorsPick />

          <section className={style.content__wrap}>
            <BestStories page={2} />
          </section>

          <section className={style.content__wrap}>
            <RandomCategory idx={6} />
          </section>

          <section className={style.content__wrap}>
            <RandomCategory idx={12} />
          </section>

          <section className={style.content__wrap}>
            <RandomCategory idx={16} />
          </section>
        </Suspense>
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
