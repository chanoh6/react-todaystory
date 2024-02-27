import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApi } from 'context/ApiContext';
import { formatAgo } from 'utils/date';
import { LikeUnfilledIcon, ViewIcon } from 'assets';
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';

function EditorsPick() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { api } = useApi();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = process.env.REACT_APP_BASE_IMG_URL;
  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setContent(null);

      try {
        return api.editors(lang);
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
        <h1>{t(`editor.title`)}</h1>
        <h2>{content.subtitle}</h2>
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
            <ViewIcon width={16} height={16} fill={'var(--color-blue)'} />
            <p id="viewCount">{content.viewCount}</p>
            <LikeUnfilledIcon width={16} height={16} fill={'var(--color-blue)'} />
          </div>
        </div>
      </article>
    </section>
  );
}

export default EditorsPick;
