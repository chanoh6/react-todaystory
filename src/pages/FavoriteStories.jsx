import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavorite } from 'hooks/useLocalStorage';
import { useFavoriteStories } from 'hooks/useStories';
import { CardListSkeleton, Loading, TypeC } from 'components';
import { ArrowLeftIcon } from 'assets';
import style from 'styles/FavoriteStories.module.css';

const FavoriteStories = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getFavorite } = useFavorite();
  const [idxList, setIdxList] = useState(getFavorite());
  const { loading, error, data } = useFavoriteStories(idxList);
  const { contents } = data;

  if (loading || error) return <Loading />;

  return (
    <>
      <header className={style.header}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={10} height={18} />
        </button>
        <h1>{t(`menu.favorites`)}</h1>
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
};

export default FavoriteStories;
