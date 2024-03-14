import { useNavigate, useParams } from 'react-router-dom';
import { useAPI } from 'context/APIContext';
import { CardListSkeleton, Loading, MenuButton, TypeC } from 'components';
import { ArrowLeftIcon } from 'assets';
import style from 'styles/Category.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';

const Category = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { api } = useAPI();
  const [contents, setContents] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      if (page === 1) setCategory(res.data.category);
      setContents((prev) => [...prev, ...res.data.contents]);
      setHasMore(res.data.contents.length > 0); // 받아온 데이터가 더 있는지 확인
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
        <h1>{category}</h1>
        <MenuButton />
      </header>

      <main>
        {!contents ? (
          <CardListSkeleton />
        ) : (
          <section className={style.content__wrap}>
            <ul className={style.list}>
              {contents.map((content, i) => {
                if (contents.length === i + 1) {
                  return <div key={i} ref={lastItemRef}></div>;
                } else {
                  return <TypeC key={i} content={content} />;
                }
              })}
            </ul>
          </section>
        )}
      </main>
    </>
  );
};

export default Category;
