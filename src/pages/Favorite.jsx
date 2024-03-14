import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavorite } from 'hooks/useLocalStorage';
import { useFavoriteStories } from 'hooks/useStories';
import { CardListSkeleton, Loading, TypeC, TypeE } from 'components';
import { ArrowLeftIcon } from 'assets';
import style from 'styles/Favorite.module.css';

const Favorite = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getFavorite } = useFavorite();
  const [idxList, setIdxList] = useState(getFavorite());
  const { loading, error, data } = useFavoriteStories(idxList);
  const { contents } = data;
  const cardRef = useRef({});

  const handleCardClick = (cardId) => {
    cardRef.current[cardId].remove();
  };

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
                <TypeE
                  key={i}
                  cardId={i}
                  content={content}
                  ref={(el) => (cardRef.current[i] = el)}
                  onClick={handleCardClick}
                />
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
};

export default Favorite;
