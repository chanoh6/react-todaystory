import { useNavigate } from 'react-router-dom';
import style from '../styles/Home.module.css';
import CategoryList from '../components/CategoryList';
import ContentList from '../components/ContentList';
import EditorsPick from '../components/EditorsPick';

/**
 * @TODOS
 * 1. 좋아요 기능 추가
 * 2. 상단 카테고리 swiper 적용
 * 3. 하단 카테고리 콘텐츠 무한 스크롤 적용
 * */

function Home() {
  const navigate = useNavigate();
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <>
      <header className={style.header}>
        <hgroup className={style.logo}>
          <h1
            onClick={() => {
              navigate('/');
            }}
          >
            오늘의 스토리
          </h1>
          <h2>
            {month}월 {day}일
          </h2>
        </hgroup>
        <div className={style.menu}>
          <figure className={style.icon}>
            <img src="./assets/icon_search.svg" alt="search" />
          </figure>
          <figure className={style.icon}>
            <img src="./assets/icon_menu.svg" alt="menu" />
          </figure>
        </div>
      </header>

      <CategoryList />

      <main>
        <ContentList list={1} type="top" title="top stories" index={0} more={false} />
        <ContentList list={4} type="best" title="best stories" index={1} more={false} />
        <EditorsPick />
        <ContentList list={4} type="best" title="best stories" index={2} more={false} />
        <ContentList list={3} type="category" title="여행" index={6} more={true} />
        <ContentList list={2} type="category" title="라이프스타일" index={12} more={true} />
        <ContentList list={4} type="category" title="건강" index={16} more={true} />
      </main>

      <footer></footer>
    </>
  );
}

export default Home;
