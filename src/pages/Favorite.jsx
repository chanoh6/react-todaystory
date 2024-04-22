import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { useAdContext } from 'context/AdContext';
import { useFavorite } from 'hooks/useLocalStorage';
import { CardListSkeleton, Loading, NoStories, TypeC } from 'components';
import { ArrowLeftIcon } from 'assets';
import style from 'styles/Favorite.module.css';
import AdInfeed from 'components/Ad/AdInfeed';

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
  let adNum = 3;

  // 뒤로가기 버튼 클릭
  const handleBack = () => navigate(-1);

  // 카드 클릭시 좋아요 취소
  const handleCardClick = (idx) =>
    setData({ ...data, contents: data.contents.filter((content) => content.idx !== idx) });

  // API 호출
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

  // 광고 추가
  const getAd = (index) => {
    // 0, 1, 2 반환
    const requsetAdNum = ((adNum - 3) / 4) % 3;
    adNum += 4;
    return <AdInfeed index={index} adNum={requsetAdNum} />;
  };

  // 좋아요한 콘텐츠 목록 불러오기
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

  // 광고 높이만큼 footer padding 추가
  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.style.paddingBottom = `${adHeight}px`;
    }
  }, [adHeight, footerRef.current]);

  if (loading || error) return <Loading />;

  // issue: 로컬스토리지에 값이 저장되지 않음. 로컬스토리지 수락 여부 확인 필요
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
                data.contents.map((content, index) => (
                  <React.Fragment key={index}>
                    {index === adNum && getAd(index)}
                    <TypeC key={index} content={content} onClick={handleCardClick} />
                  </React.Fragment>
                ))
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
