import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { CardListSkeleton, Loading, MenuButton, NoStories, TypeC } from 'components';
import { ArrowLeftIcon } from 'assets';
import style from 'styles/Category.module.css';

const Category = () => {
  const { state } = useLocation();
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const size = process.env.REACT_APP_INFINITY_SCROLL_SIZE;

  const fetchData = async (idx, page, size) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.categoryStories(idx, page, size);
      return res;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pageId, page, size).then((res) => {
      if (res.code === '0') {
        setData((prev) => {
          if (!prev) return res.data;
          if (prev.categoryIdx !== pageId) return res.data;
          return { ...prev, contents: [...prev.contents, ...res.data.contents] };
        });
        
        res.data.contents.length >= size ? setHasMore(true) : setHasMore(false); // 받아온 데이터가 더 있는지 확인
      }
    });
  }, [pageId, page]);

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

  if (loading && page === 0) return <Loading />;
  if (error) return <Loading />;

  return (
    <>
      <header className={style.header}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={10} height={18} />
        </button>
        {/* <h1>{data.category}</h1> */}
        <h1>{state.title}</h1>
        <MenuButton />
      </header>

      <main>
        {!data ? (
          <CardListSkeleton />
        ) : (
          <section className={style.content__wrap}>
            <ul className={style.list}>
              { data.contents.length === 0 ? (
                <NoStories text={t(`noStories.stories`)} />
                ) : (
                data.contents.map((content, i) => {
                  if (data.contents.length !== 1 && data.contents.length === i + 1) {
                    return <li key={i} ref={lastItemRef}></li>;
                  } else {
                    return <TypeC key={i} content={content} />;
                  }
                })
              )}
            </ul>
          </section>
        )}
      </main>
    </>
  );
};

export default Category;
