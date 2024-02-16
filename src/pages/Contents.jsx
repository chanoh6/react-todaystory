import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useApi } from 'context/ApiContext';
import { CardS } from 'components';
import { BackIcon, MoreIcon } from 'assets';
import style from 'styles/Contents.module.css';

function Contents() {
  const { pageId } = useParams();
  const {
    state: { title },
  } = useLocation();
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
        // for test
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
        <h1>{title}</h1>
        <button className={style.icon}>
          <MoreIcon />
        </button>
      </header>
      <main>
        {loading || error || !contents ? (
          ''
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

export default Contents;
