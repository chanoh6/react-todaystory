import style from '../styles/Header.module.css';

function Header() {
  return (
    <header>
      <hgroup className={style.logo}>
        <h1>오늘의 스토리</h1>
        <h2>1월 12일</h2>
      </hgroup>
      <div className={style.menu}>
        <div className={style.icon}>
          <img src="./assets/icon_search.svg" alt="search" />
        </div>
        <div className={style.icon}>
          <img src="./assets/icon_menu.svg" alt="menu" />
        </div>
      </div>
    </header>
  );
}

export default Header;
