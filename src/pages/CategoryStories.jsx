import { useNavigate, useParams } from 'react-router-dom';
import { useMenu } from 'hooks/useMenu';
import { useCategoryStories } from 'hooks/useStories';
import { CardListSkeleton, Loading, Menu, TypeC } from 'components';
import { ArrowLeftIcon, MenuIcon, MoreIcon } from 'assets';
import style from 'styles/CategoryStories.module.css';

function CategoryStories() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { showMenu, handleClickMenu, handleCloseMenu } = useMenu();
  const { loading, error, data } = useCategoryStories(pageId, 1, 10);
  const { category, categoryIdx, color, contents } = data;

  if (loading || error) return <Loading />;

  return (
    <>
      <header className={style.header}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={10} height={18} />
        </button>
        <h1>{category}</h1>
        <button onClick={handleClickMenu}>
          <MenuIcon width={20} height={20} fill={'var(--color-black)'} />
        </button>
        {showMenu && <Menu onClose={handleCloseMenu} />}
      </header>

      <main>
        {!contents ? (
          <CardListSkeleton />
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

export default CategoryStories;
