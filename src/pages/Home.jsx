import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLoading } from 'hooks/useLoading';
import { useMenu } from 'hooks/useMenu';
import { Menu, Category, TopStories, BestStories, EditorsPick, CategoryStories, Loading } from 'components';
import { SearchIcon, MenuIcon, LuckIcon } from 'assets';
import cn from 'classnames';
import style from 'styles/Home.module.css';

/**
 * @TODOS
 * -- 1. 좋아요 기능 추가
 * 2. 상단 카테고리 swiper 적용
 * 3. 무한 스크롤 구현
 * -- 4. 아이콘 함수 사용? 나중에
 * -- 5. formatAgo 다국어 설정 어떻게 할건지
 * -- 6. 로딩 화면 확인
 */

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showMenu, handleClickMenu, handleCloseMenu } = useMenu();
  const { loading } = useLoading();
  const date = t(`header.date`, {
    val: new Date(),
    formatParams: {
      val: { month: 'long', day: 'numeric' },
    },
  });
  const handleClickLogo = () => navigate('/');
  const handleClickFortune = () => window.open('http://s.sazoo.com/fortune/tarot.html');

  if (loading) return <Loading />;

  return (
    <>
      <header className={style.header}>
        <hgroup className={style.logo}>
          <h1 onClick={handleClickLogo}>{t(`header.logo`)}</h1>
          <h2>{date}</h2>
        </hgroup>

        <div className={style.menu}>
          <button className={style.icon}>
            <SearchIcon width={20} height={20} fill={'var(--color-black)'} />
          </button>
          <button className={style.icon} onClick={handleClickMenu}>
            <MenuIcon width={20} height={20} fill={'var(--color-black)'} />
          </button>
          {showMenu && <Menu onClose={handleCloseMenu} />}
        </div>
      </header>

      <nav className={style.nav}>
        <Category />
        <div className={style.nav__ad}>
          <button className={style.ad__item} onClick={handleClickFortune}>
            <LuckIcon width={18} height={20} fill="var(--color-black)" />
            <p>{t(`nav.fortune`)}</p>
          </button>
        </div>
      </nav>

      <main>
        <section className={cn(style.content__wrap, style.top)}>
          <TopStories size={6} />
        </section>

        <section className={style.content__wrap}>
          <BestStories page={1} size={4} />
        </section>

        <EditorsPick />

        <section className={style.content__wrap}>
          <BestStories page={2} size={4} />
        </section>

        <section className={style.content__wrap}>
          <CategoryStories list={3} idx={1} page={1} size={4} />
        </section>

        <section className={style.content__wrap}>
          <CategoryStories list={3} idx={2} page={1} size={4} />
        </section>

        <section className={style.content__wrap}>
          <CategoryStories list={3} idx={3} page={1} size={4} />
        </section>
      </main>

      <footer></footer>
    </>
  );
}

export default Home;
