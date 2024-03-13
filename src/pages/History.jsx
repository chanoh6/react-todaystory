import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'hooks/useLocalStorage';
import { useHistoryStories } from 'hooks/useStories';
import { CardListSkeleton, Loading, TypeC } from 'components';
import { ArrowLeftIcon } from 'assets';
import style from 'styles/History.module.css';

const History = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { clearHistory, getHistory } = useHistory();
  const [idxList, setIdxList] = useState(getHistory());
  const { loading, error, data } = useHistoryStories(idxList);
  const { contents } = data || {};

  const handleClearHistory = () => {
    clearHistory();
    setIdxList([]);
  };

  if (loading || error) return <Loading />;

  return (
    <>
      <header className={style.header}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={10} height={18} />
        </button>
        <h1>{t(`menu.history`)}</h1>
        <p onClick={handleClearHistory}>{t(`history.clear`)}</p>
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

export default History;
