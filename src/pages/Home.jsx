import style from '../styles/Home.module.css';
import Header from '../components/Header';
import Category from '../components/Category';
import CardL from '../components/CardL';
import CardM from '../components/CardM';
import CardS from '../components/CardS';
import CardEditor from '../components/CardEditor';

function Home() {
  return (
    <>
      <Header />
      <Category />
      <main>
        <section className={style.wrap}>
          <h1 className={style.title}>top stories</h1>
          <ul className={style.list}>
            <CardL />
            <CardM />
            <CardM />
            <CardS />
            <CardS />
            <CardS />
          </ul>
        </section>
        <section className={style.wrap}>
          <h1 className={style.title}>best stories</h1>
          <ul className={style.list}>
            <CardS />
            <CardS />
            <CardS />
            <CardS />
          </ul>
        </section>
        <CardEditor />
        <section className={style.wrap}>
          <h1 className={style.title}>best stories</h1>
          <ul className={style.list}>
            <CardS />
            <CardS />
            <CardS />
            <CardS />
          </ul>
        </section>
        <section className={style.wrap}>
          <div className={style.title__wrap}>
            <h1 className={style.title}>category</h1>
            <button className={style.btn__more}>
              <p>더보기</p>
              <img src="../assets/btn_more.svg" alt="btn more" />
            </button>
          </div>
          <ul className={style.list}>
            <CardL />
            <CardS />
            <CardS />
            <CardS />
          </ul>
        </section>
        <section className={style.wrap}>
          <div className={style.title__wrap}>
            <h1 className={style.title}>category</h1>
            <button className={style.btn__more}>
              <p>더보기</p>
              <img src="../assets/btn_more.svg" alt="btn more" />
            </button>
          </div>
          <ul className={style.list}>
            <CardL />
            <CardM />
            <CardM />
            <CardS />
          </ul>
        </section>
        <section className={style.wrap}>
          <div className={style.title__wrap}>
            <h1 className={style.title}>category</h1>
            <button className={style.btn__more}>
              <p>더보기</p>
              <img src="../assets/btn_more.svg" alt="btn more" />
            </button>
          </div>
          <ul className={style.list}>
            <CardS />
            <CardS />
            <CardS />
            <CardS />
          </ul>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default Home;
