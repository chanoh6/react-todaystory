import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { useFavorite } from 'hooks/useLocalStorage';
import { CardListSkeleton, Loading, NoStories, TypeC, TypeE } from 'components';
import { ArrowLeftIcon } from 'assets';
import style from 'styles/Favorite.module.css';

const Favorite = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getFavorite } = useFavorite();
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleCardClick = (idx) => {
    setData({ ...data, contents: data.contents.filter((content) => content.idx !== idx) });
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
    const idxList = getFavorite();

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
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={10} height={18} />
        </button>
        <h1>{t(`menu.favorites`)}</h1>
      </header>

      <main>
        {!data ? (
          <CardListSkeleton />
        ) : (
          <section className={style.content__wrap}>
            <ul className={style.list}>
              {data.contents.length === 0 ? (
                <NoStories text={t(`noStories.favorite`)} />
              ) : (
                data.contents.map((content, i) => <TypeE key={i} content={content} onClick={handleCardClick} />)
              )}
            </ul>
          </section>
        )}
      </main>
    </>
  );
};

export default Favorite;
