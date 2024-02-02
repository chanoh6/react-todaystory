import { useEffect, useState } from 'react';
import { useTodaystoryApi } from '../context/TodaystoryApiContext';
import { useNavigate } from 'react-router-dom';
import { formatAgo } from '../utils/date';
import '../styles/Card.css';
import style from '../styles/CardEditor.module.css';

function CardEditor() {
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { todaystory } = useTodaystoryApi();
  const baseURL = 'https://picks.my/ko/s/';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setEditor(null);

      try {
        todaystory.editors().then((res) => setEditor(res));
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <ul className={style.list}>로딩중</ul>;
  if (error) return <ul className={style.list}>에러가 발생했습니다</ul>;
  if (!editor) {
    return (
      <article
        className={style.card}
        onClick={() => {
          navigate(`/view/`);
        }}
      >
        <div className={style.card__img}>
          <figure className={style.thumbnail}>
            <img src="./assets/no_image.png" alt="thumbnail" />
          </figure>
          <figure className={style.background}>
            <img src="./assets/no_image.png" alt="background" />
          </figure>
        </div>
        <div className="card__title">
          <div className="cp">
            <img src="./assets/no_image.png" alt="cp logo" />
            <p></p>
          </div>
          <p className="title"></p>
        </div>
        <div className="card__more">
          <div className="date">
            <span id="publishedDate"></span>
            <span>|</span>
            <span id="contentCategory"></span>
          </div>
          <div className="like">
            <div className="view">
              <img src="./assets/icon_view.svg" alt="icon view" />
              <p id="viewCount"></p>
            </div>
            <img src="./assets/icon_like.svg" alt="icon like" />
          </div>
        </div>
      </article>
    );
  }
  return (
    <article
      className={style.card}
      onClick={() => {
        navigate(`/view/${editor.idx}`);
      }}
    >
      <div className={style.card__img}>
        <figure className={style.thumbnail}>
          <img src={`${baseURL}Thumbnail/${editor.thumbnail}`} alt="thumbnail" />
        </figure>
        <figure className={style.background}>
          <img src={`${baseURL}Thumbnail/${editor.thumbnail}`} alt="background" />
        </figure>
      </div>
      <div className="card__title">
        <div className="cp">
          <img src={`${baseURL}cp/${editor.logo}`} alt="cp logo" />
          <p>{editor.channel}</p>
        </div>
        <p className="title">{editor.title}</p>
      </div>
      <div className="card__more">
        <div className="date">
          <span id="publishedDate">{formatAgo(editor.publishedAt, 'ko')}</span>
          <span>|</span>
          <span id="contentCategory">{editor.category}</span>
        </div>
        <div className="like">
          <div className="view">
            <img src="./assets/icon_view.svg" alt="icon view" />
            <p id="viewCount">{editor.viewCount}</p>
          </div>
          <img src="./assets/icon_like.svg" alt="icon like" />
        </div>
      </div>
    </article>
  );
}

export default CardEditor;
