import { useParams } from 'react-router-dom';
import style from '../styles/ContentDetail.module.css';
import ContentList from '../components/ContentList';

function ContentDetail() {
  const { contentId } = useParams();

  return (
    <>
      <header className={style.header}>
        <div className={style.header__btn}>
          <figure className={style.icon}></figure>
          <figure className={style.icon}></figure>
        </div>
        <h1>웨더뉴스</h1>
        <div className={style.header__btn}>
          <figure className={style.icon}></figure>
          <figure className={style.icon}></figure>
        </div>
      </header>
      <main>
        <section className={style.content__wrap}>
          <h1 className={style.title}>content {contentId}</h1>
          <p className={style.editor}>by editor</p>
          <p className={style.date}>YYYY.MM.DD</p>
          <div className={style.content}>
            <img src="https://picks.my/ko/s/Thumbnail/a67c7180f9c430d5e25c14e48e9f2b497db4c0ba.jpg" alt="thumbnail" />
            <p>
              <strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
              leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
              the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div className={style.content__more}>
            <button className={style.more}>
              <span>&lt;channel&gt; 최신 기사 읽기</span>
            </button>
          </div>
        </section>
        <ContentList list={4} type="best" title="best stories" index={1} more={false} />
        <ContentList list={4} type="category" title="라이프스타일" index={12} more={true} />
      </main>
      <footer></footer>
    </>
  );
}

export default ContentDetail;
