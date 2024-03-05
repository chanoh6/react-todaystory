import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategoryStories } from 'hooks/useStories';
import { CardListSkeleton, Loading, Menu, TypeC } from 'components';
import { ArrowRightIcon, BackIcon } from 'assets';
import style from 'styles/FavoriteStories.module.css';

function FavoriteStories() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading, error, contents } = useCategoryStories(6);

  if (loading || error) return <Loading />;

  return (
    <>
      {/* <header className={style.header}>
        <button className={style.icon} onClick={() => navigate(-1)}>
          <BackIcon style={{ marginRight: '2px' }} />
        </button>
        <h1>{t(`menu.favorites`)}</h1>
      </header> */}

      <header className={style.header}>
        <button onClick={() => navigate(-1)}>
          <ArrowRightIcon width={10} height={20} style={{ rotate: '180deg' }} />
        </button>
        <h1>{t(`menu.favorites`)}</h1>
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

export default FavoriteStories;
