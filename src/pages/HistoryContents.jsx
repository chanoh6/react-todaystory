import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from 'context/ApiContext';
import { useTranslation } from 'react-i18next';
import { DetailListSkeleton, TypeC } from 'components';
import { useHistory } from 'hooks/history';
import { ReactComponent as BackIcon } from 'assets/icon/Back.svg';
import style from 'styles/HistoryContents.module.css';

function HistoryContents() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useApi();
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clearHistory } = useHistory();

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
        <h1>{t(`menu.history`)}</h1>
        <p onClick={clearHistory}>{t(`history.clear`)}</p>
      </header>
      <main>
        {loading || error || !contents ? (
          <DetailListSkeleton />
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

export default HistoryContents;
