import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaystoryApi } from 'context/TodaystoryApiContext';
import { formatAgo } from 'utils/date';
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';
import { ReactComponent as LikeIcon } from 'assets/icon/LikeUnfilled.svg';
import { ReactComponent as ViewIcon } from 'assets/icon/View.svg';

function EditorsPick() {
  const navigate = useNavigate();
  const { todaystory } = useTodaystoryApi();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = process.env.REACT_APP_BASE_IMG_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setContent(null);

      try {
        return todaystory.editors();
      } catch (e) {
        setError(e);
      }
    };

    fetchData().then((res) => {
      setContent(res);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  }, []);

  if (loading || error || !content) return null;

  return (
    <section className={style.content__wrap}>
      <hgroup className={style.content__title}>
        <h1>editors' pick</h1>
        <h2>주목할 만한 콘텐츠</h2>
      </hgroup>
      <article className={style.card} onClick={() => navigate(`/view/${content.idx}`, { state: { content } })}>
        <div className={style.card__img}>
          <figure className={style.thumbnail}>
            <img src={`${baseURL}Thumbnail/${content.thumbnail}`} alt="thumbnail" />
          </figure>
          <figure className={style.background}>
            <img src={`${baseURL}Thumbnail/${content.thumbnail}`} alt="background" />
          </figure>
        </div>
        <div className="card__title">
          <div className="cp">
            <img src={`${baseURL}cp/${content.logo}`} alt="cp logo" />
            <p>{content.channel}</p>
          </div>
          <p className="title">{content.title}</p>
        </div>
        <div className="card__more">
          <div className="date">
            <span id="publishedAt">{formatAgo(content.publishedAt, 'ko')}</span>
            <span>|</span>
            <span id="category">{content.category}</span>
          </div>
          <div className="like">
            <ViewIcon width={16} height={16} fill={'#459AFF'} />
            <p id="viewCount">{content.viewCount}</p>
            <LikeIcon width={16} height={16} fill={'#459AFF'} />
          </div>
        </div>
      </article>
    </section>
  );
}

export default EditorsPick;
