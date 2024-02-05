import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaystoryApi } from '../context/TodaystoryApiContext';
import { formatAgo } from '../utils/date';
import '../styles/Card.css';
import style from '../styles/EditorsPick.module.css';
import ListSkeleton from './ListSkeleton';

function EditorsPick() {
  const navigate = useNavigate();
  const { todaystory } = useTodaystoryApi();
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseURL = 'https://picks.my/ko/s/';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setContents(null);

      try {
        todaystory.editors().then((res) => setContents(res));
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading || error || !contents ? (
        <ListSkeleton />
      ) : (
        <section className={style.content__wrap}>
          <hgroup className={style.content__title}>
            <h1>editors' pick</h1>
            <h2>주목할 만한 콘텐츠</h2>
          </hgroup>
          <article
            className={style.card}
            onClick={() => {
              navigate(`/view/${contents.idx}`);
            }}
          >
            <div className={style.card__img}>
              <figure className={style.thumbnail}>
                <img src={`${baseURL}Thumbnail/${contents.thumbnail}`} alt="thumbnail" />
              </figure>
              <figure className={style.background}>
                <img src={`${baseURL}Thumbnail/${contents.thumbnail}`} alt="background" />
              </figure>
            </div>
            <div className="card__title">
              <div className="cp">
                <img src={`${baseURL}cp/${contents.logo}`} alt="cp logo" />
                <p>{contents.channel}</p>
              </div>
              <p className="title">{contents.title}</p>
            </div>
            <div className="card__more">
              <div className="date">
                <span id="publishedDate">{formatAgo(contents.publishedAt, 'ko')}</span>
                <span>|</span>
                <span id="contentCategory">{contents.category}</span>
              </div>
              <div className="like">
                <div className="view">
                  <img src="./assets/icon_view.svg" alt="icon view" />
                  <p id="viewCount">{contents.viewCount}</p>
                </div>
                <img src="./assets/icon_like.svg" alt="icon like" />
              </div>
            </div>
          </article>
        </section>
      )}
    </>
  );
}

export default EditorsPick;
