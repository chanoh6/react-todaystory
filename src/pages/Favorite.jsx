import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { useAdContext } from 'context/AdContext';
import { useFavorite } from 'hooks/useLocalStorage';
import { CardListSkeleton, Loading, NoStories, TypeD } from 'components';
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
  const { adHeight } = useAdContext();
  const footerRef = useRef(null);

  // 뒤로가기 버튼 클릭
  const handleBack = () => navigate(-1);

  // 카드 클릭시 즐겨찾기 해제
  const handleCardClick = (idx) =>
    setData({ ...data, contents: data.contents.filter((content) => content.idx !== idx) });

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

  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.style.paddingBottom = `${adHeight}px`;
    }
  }, [adHeight, footerRef.current]);

  if (loading || error) return <Loading />;

  return (
    <>
      <header className={style.header}>
        <button type="button" aria-label="back_button" onClick={handleBack}>
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
                data.contents.map((content, i) => <TypeD key={i} content={content} onClick={handleCardClick} />)
              )}
            </ul>
          </section>
        )}
      </main>

      <footer ref={footerRef}></footer>
    </>
  );
};

export default Favorite;
