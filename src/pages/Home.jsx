import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, CategoryList, ContentList, EditorsPick } from 'components';
import { SearchIcon, MenuIcon } from 'assets';
import { useTranslation } from 'react-i18next';
// import i18n from 'locales/i18n';
import cn from 'classnames';
import style from 'styles/Home.module.css';

/**
 * @TODOS
 * 1. 좋아요 기능 추가
 * 2. 상단 카테고리 swiper 적용
 * 3. 하단 카테고리 콘텐츠 무한 스크롤 적용
 * 4. 아이콘 함수 사용?
 * 5. formatAgo 다국어 설정 어떻게 할건지
 */

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const date = new Date();
  const baseImgURL = process.env.REACT_APP_CATEGORY_ICON;

  return (
    <>
      <header className={style.header}>
        <hgroup className={style.logo}>
          <h1 onClick={() => navigate('/')}>{t(`header.logo`)}</h1>
          <h2>
            {t(`header.date`, {
              val: date,
              formatParams: {
                val: { month: 'long', day: 'numeric' },
              },
            })}
          </h2>
        </hgroup>
        <div className={style.menu}>
          <button className={style.icon}>
            <SearchIcon width={20} height={20} fill={'black'} />
          </button>
          <button className={style.icon} onClick={() => setShowMenu(true)}>
            <MenuIcon width={20} height={20} fill={'black'} />
          </button>
          {showMenu && <Menu onClose={() => setShowMenu(false)} />}
        </div>
      </header>

      <nav className={style.nav}>
        <CategoryList />
        <div className={style.nav__ad}>
          <button className={style.ad__item} onClick={() => window.open('http://s.sazoo.com/fortune/tarot.html')}>
            <img src={`${baseImgURL}fortune.svg`} alt="category icon" />
            <p>{t(`nav.fortune`)}</p>
          </button>
        </div>
      </nav>

      <main>
        <section className={cn(style.content__wrap, style.top)}>
          <ContentList list={1} type="top" title={t(`main.top`)} index={0} more={false} />
        </section>
        <section className={style.content__wrap}>
          <ContentList list={4} type="best" title={t(`main.best`)} index={1} more={false} />
        </section>
        <EditorsPick />
        <section className={style.content__wrap}>
          <ContentList list={4} type="best" title={t(`main.best`)} index={2} more={false} />
        </section>
        <section className={style.content__wrap}>
          <ContentList list={3} type="category" title="여행" index={6} more={true} />
        </section>
        <section className={style.content__wrap}>
          <ContentList list={2} type="category" title="라이프스타일" index={12} more={true} />
        </section>
        <section className={style.content__wrap}>
          <ContentList list={4} type="category" title="건강" index={16} more={true} />
        </section>
      </main>

      <footer></footer>
    </>
  );
}

export default Home;
