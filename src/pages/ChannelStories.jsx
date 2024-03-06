import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMenu } from 'hooks/useMenu';
import { useCategoryStories } from 'hooks/useStories';
import { CardListSkeleton, Loading, Menu, TypeC } from 'components';
import { ArrowRightIcon, ArrowLeftIcon, MenuIcon, MoreIcon } from 'assets';
import style from 'styles/CategoryStories.module.css';

function ChannelStories() {
  const { pageId } = useParams();
  const {
    state: { title },
  } = useLocation();
  const navigate = useNavigate();
  const { showMenu, handleClickMenu, handleCloseMenu } = useMenu();
  const { loading, error, category, contents } = useCategoryStories(6);

  if (loading || error) return <Loading />;

  return (
    <>
      {/* <header className={style.header}>
        <button className={style.icon} onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={12} height={20} style={{ marginRight: '2px' }} />
        </button>
        <h1>{title}</h1>
        <button className={style.icon}>
          <MoreIcon />
        </button>
      </header> */}
      <header className={style.header}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={12} height={20} />
        </button>
        <h1>{title}</h1>
        <button onClick={handleClickMenu}>
          <MenuIcon width={20} height={20} fill={'var(--color-black)'} />
        </button>
        {showMenu && <Menu onClose={handleCloseMenu} />}
      </header>
      <main>
        {!contents.contents ? (
          <CardListSkeleton />
        ) : (
          <section className={style.content__wrap}>
            <ul className={style.list}>
              {contents.contents.map((content, i) => (
                <TypeC key={i} content={content} />
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}

export default ChannelStories;
