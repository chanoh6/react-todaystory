import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { useAdContext } from 'context/AdContext';
import { CardListSkeleton, Loading, MenuButton, NoStories, TypeC } from 'components';
import { ArrowLeftIcon } from 'assets';
import style from 'styles/Category.module.css';

const Channel = () => {
  const size = process.env.REACT_APP_INFINITY_SCROLL_SIZE;
  const { state, pathname } = useLocation();
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // 현재 페이지
  const [page, setPage] = useState(1);
  // 더 불러올 데이터가 있는지 여부
  const [hasMore, setHasMore] = useState(true);
  const { adHeight } = useAdContext();
  const footerRef = useRef(null);

  // 뒤로가기 버튼 클릭
  const handleBack = () => navigate(-1);

  // 무한 스크롤 기능
  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  // API 호출 함수
  const fetchData = async (idx, page, size) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.channelStories(idx, page, size);
      return res;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // 페이지 이동 시 데이터 초기화
  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    setPage(1);

    fetchData(pageId, 1, size).then((res) => {
      if (res.code === '0') {
        setData(res.data);
        // 받아올 데이터가 더 있는지 확인
        res.data.contents.length >= size ? setHasMore(true) : setHasMore(false);
      }
    });
  }, [pageId, pathname]);

  // 무한 스크롤 시 데이터 추가 호출
  useEffect(() => {
    if (page === 1) return;
    fetchData(pageId, page, size).then((res) => {
      if (res.code === '0') {
        setData((prev) => {
          if (!prev) return res.data;
          return { ...prev, contents: [...prev.contents, ...res.data.contents] };
        });
        // 받아올 데이터가 더 있는지 확인
        res.data.contents.length >= size ? setHasMore(true) : setHasMore(false);
      }
    });
  }, [page]);

  // 광고 높이만큼 footer padding 추가
  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.style.paddingBottom = `${adHeight}px`;
    }
  }, [adHeight, footerRef.current]);

  if (loading && page === 1) return <Loading />;
  if (error) return null;

  return (
    <>
      <header className={style.header}>
        <button type="button" aria-label="back_button" onClick={handleBack}>
          <ArrowLeftIcon width={10} height={18} />
        </button>
        <h1>{state?.title ?? data.cp ?? ''}</h1>
        <MenuButton />
      </header>

      <main>
        {!data ? (
          <CardListSkeleton />
        ) : (
          <section className={style.content__wrap}>
            <ul className={style.list}>
              {data.contents.length === 0 ? (
                <NoStories text={t(`noStories.stories`)} />
              ) : (
                data.contents.map((content, i) => <TypeC key={i} content={content} />)
              )}
              {hasMore && <li ref={lastItemRef}></li>}
            </ul>
          </section>
        )}
      </main>

      <footer ref={footerRef}></footer>
    </>
  );
};

export default Channel;
