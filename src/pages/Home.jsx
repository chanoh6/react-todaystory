import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMenu } from 'hooks/home';
import { Menu, Category, TopStories, BestStories, EditorsPick, CategoryStories } from 'components';
import { SearchIcon, MenuIcon } from 'assets';
import cn from 'classnames';
import style from 'styles/Home.module.css';

/**
 * @TODOS
 * -- 1. 좋아요 기능 추가
 * 2. 상단 카테고리 swiper 적용
 * 3. 하단 카테고리 콘텐츠 무한 스크롤 적용
 * 4. 아이콘 함수 사용?
 * -- 5. formatAgo 다국어 설정 어떻게 할건지
 * 6. 로딩 화면 확인
 */

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showMenu, clickMenu } = useMenu();
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
          <button className={style.icon} onClick={clickMenu}>
            <MenuIcon width={20} height={20} fill={'black'} />
          </button>
          {showMenu && <Menu onClose={clickMenu} />}
        </div>
      </header>

      <nav className={style.nav}>
        <Category />
        <div className={style.nav__ad}>
          <button className={style.ad__item} onClick={() => window.open('http://s.sazoo.com/fortune/tarot.html')}>
            <img src={`${baseImgURL}fortune.svg`} alt="category icon" />
            <p>{t(`nav.fortune`)}</p>
          </button>
        </div>
      </nav>

      <main>
        <section className={cn(style.content__wrap, style.top)}>
          <TopStories />
        </section>
        <section className={style.content__wrap}>
          <BestStories start={1} />
        </section>
        <EditorsPick />
        <section className={style.content__wrap}>
          <BestStories start={2} />
        </section>
        <section className={style.content__wrap}>
          <CategoryStories list={2} index={6} />
        </section>
        <section className={style.content__wrap}>
          <CategoryStories list={1} index={12} />
        </section>
        <section className={style.content__wrap}>
          <CategoryStories list={3} index={16} />
        </section>
      </main>

      <footer></footer>
    </>
  );
}

export default Home;
