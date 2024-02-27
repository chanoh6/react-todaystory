import React, { useEffect, useState } from 'react';
import style from 'styles/RecentlyViewContents.module.css';
import { ReactComponent as BackIcon } from 'assets/icon/Back.svg';
import { useApi } from 'context/ApiContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CardS, DetailListSkeleton } from 'components';

function RecentlyViewContents() {
  const navigate = useNavigate();
  const { api } = useApi();
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
      setContents(res);
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
        <h1>최근 본 콘텐츠</h1>
        <p>지우기</p>
      </header>
      <main>
        {loading || error || !contents ? (
          <DetailListSkeleton />
        ) : (
          <section className={style.content__wrap}>
            <ul className={style.list}>
              {contents.map((content, i) => (
                <CardS key={i} content={content} />
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}

export default RecentlyViewContents;
