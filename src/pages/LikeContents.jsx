import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAPI } from 'context/APIContext';
import { useTranslation } from 'react-i18next';
import { ContentListSkeleton, TypeC } from 'components';
import { BackIcon } from 'assets';
import style from 'styles/LikeContents.module.css';

function LikeContents() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setContents(null);

      try {
        return api.category(6);
      } catch (e) {
        setError(e);
      }
    };

    fetchData().then((res) => {
      setContents(res.contents);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  }, []);

  return (
    <>
      <header className={style.header}>
        <button className={style.icon} onClick={() => navigate(-1)}>
          <BackIcon style={{ marginRight: '2px' }} />
        </button>
        <h1>{t(`menu.favorites`)}</h1>
      </header>
      <main>
        {loading || error || !contents ? (
          <ContentListSkeleton />
        ) : (
          <section className={style.content__wrap}>
            <ul className={style.list}>
              {contents.map((content, i) => (
                <TypeC key={i} content={content} />
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}

export default LikeContents;
