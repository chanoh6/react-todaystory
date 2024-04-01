import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { useHistory } from 'hooks/useLocalStorage';
import { CardListSkeleton, Loading, NoStories, TypeC } from 'components';
import { ArrowLeftIcon } from 'assets';
import style from 'styles/History.module.css';

const History = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { clearHistory, getHistory } = useHistory();
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleClearClick = () => {
    clearHistory();
    setData({ ...data, contents: [] });
  };

  const fetchData = async (idxList) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await api.storiesByIndex(idxList);
      return res;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const idxList = getHistory();

    fetchData(idxList).then((res) => {
      if (res.code === '0') {
        setData(res.data);
      } else {
        console.log(`API error: ${res.msg[process.env.REACT_APP_LOCALE]}`);
      }
    });
  }, []);

  if (loading || error) return <Loading />;

  return (
    <>
      <header className={style.header}>
        <button type="button" aria-label="back_button" onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={10} height={18} />
        </button>
        <h1>{t(`menu.history`)}</h1>
        <button type="button" aria-label="clear_button" className={style.clear} onClick={handleClearClick}>
          {t(`history.clear`)}
        </button>
      </header>

      <main>
        {!data ? (
          <CardListSkeleton />
        ) : (
          <section className={style.content__wrap}>
            <ul className={style.list}>
              {data.contents.length === 0 ? (
                <NoStories text={t(`noStories.history`)} />
              ) : (
                data.contents.map((content, i) => <TypeC key={i} content={content} />)
              )}
            </ul>
          </section>
        )}
      </main>
    </>
  );
};

export default History;
