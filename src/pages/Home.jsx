import { useNavigate } from 'react-router-dom';
import style from '../styles/Home.module.css';
import Category from '../components/Category';
import CardList from '../components/CardList';
import CardEditor from '../components/CardEditor';
import { useTodaystoryApi } from '../context/TodaystoryApiContext';

function Home() {
  const navigate = useNavigate();
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // for test
  // contextApi 사용
  const { todaystory } = useTodaystoryApi();
  const result = todaystory.posts();
  console.log(result);

  return (
    <>
      <header>
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
          <div className={style.icon}>
            <img src="./assets/icon_search.svg" alt="search" />
          </div>
          <div className={style.icon}>
            <img src="./assets/icon_menu.svg" alt="menu" />
          </div>
        </div>
      </header>

      <Category />

      <main>
        <section className={style.content__wrap}>
          <h1 className={style.title}>top stories</h1>
          <CardList type={1} contentType="topStories" />
        </section>

        <section className={style.content__wrap}>
          <h1 className={style.title}>best stories</h1>
          <CardList type={4} contentType="bestStories1" />
        </section>

        <section className={style.editor__wrap}>
          <hgroup className={style.editor__title}>
            <h1>editors' pick</h1>
            <h2>주목할 만한 콘텐츠</h2>
          </hgroup>
          <CardEditor />
        </section>

        <section className={style.content__wrap}>
          <h1 className={style.title}>best stories</h1>
          <CardList type={4} contentType="bestStories2" />
        </section>

        <section className={style.content__wrap}>
          <div className={style.content__title}>
            <h1 className={style.title}>여행</h1>
            <button
              className={style.btn__more}
              onClick={() => {
                navigate(`/${1}`);
              }}
            >
              <p>더보기</p>
              <img src="../assets/btn_more.svg" alt="btn more" />
            </button>
          </div>
          <CardList type={3} contentType={`contents${1}`} />
        </section>

        <section className={style.content__wrap}>
          <div className={style.content__title}>
            <h1 className={style.title}>라이프스타일</h1>
            <button
              className={style.btn__more}
              onClick={() => {
                navigate(`/${2}`);
              }}
            >
              <p>더보기</p>
              <img src="../assets/btn_more.svg" alt="btn more" />
            </button>
          </div>
          <CardList type={2} contentType={`contents${2}`} />
        </section>

        <section className={style.content__wrap}>
          <div className={style.content__title}>
            <h1 className={style.title}>건강</h1>
            <button
              className={style.btn__more}
              onClick={() => {
                navigate(`/${3}`);
              }}
            >
              <p>더보기</p>
              <img src="../assets/btn_more.svg" alt="btn more" />
            </button>
          </div>
          <CardList type={4} contentType={`contents${3}`} />
        </section>
      </main>

      <footer></footer>
    </>
  );
}

export default Home;
