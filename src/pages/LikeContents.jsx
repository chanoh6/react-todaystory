import React, { useEffect, useState } from 'react';
import style from 'styles/LikeContents.module.css';
import { ReactComponent as BackIcon } from 'assets/icon/Back.svg';
import { LikeFilledIcon, LikeUnfilledIcon, ViewIcon } from 'assets';
import { useApi } from 'context/ApiContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DetailListSkeleton, TypeC } from 'components';
import { useTranslation } from 'react-i18next';

function LikeContents() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useApi();
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [like, setLike] = useState(false);

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
      {/* <div className="like" onClick={() => setLike(!like)}>
        {like ? (
          <LikeFilledIcon width={40} height={40} fill={'var(--color-blue)'} />
        ) : (
          <LikeUnfilledIcon width={40} height={40} fill={'var(--color-blue)'} />
        )}
      </div> */}
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

export default LikeContents;
