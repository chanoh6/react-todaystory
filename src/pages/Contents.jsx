import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAPI } from 'context/APIContext';
import { ContentListSkeleton, Menu, TypeC } from 'components';
import { ArrowRightIcon, BackIcon, MenuIcon, MoreIcon } from 'assets';
import { useMenu } from 'hooks/useMenu';
import style from 'styles/Contents.module.css';

function Contents() {
  const { pageId } = useParams();
  const {
    state: { title },
  } = useLocation();
  const navigate = useNavigate();
  const { api } = useAPI();
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showMenu, clickMenu, closeMenu } = useMenu();

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
      {/* <header className={style.header}>
        <button className={style.icon} onClick={() => navigate(-1)}>
          <BackIcon style={{ marginRight: '2px' }} />
        </button>
        <h1>{title}</h1>
        <button className={style.icon}>
          <MoreIcon />
        </button>
      </header> */}
      <header className={style.header}>
        <button onClick={() => navigate(-1)}>
          <ArrowRightIcon width={10} height={20} style={{ rotate: '180deg' }} />
        </button>
        <h1>{title}</h1>
        <button onClick={clickMenu}>
          <MenuIcon width={20} height={20} fill={'black'} />
        </button>
        {showMenu && <Menu onClose={closeMenu} />}
      </header>
      <main>
        {loading || error || !contents ? (
          <ContentListSkeleton />
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

export default Contents;
