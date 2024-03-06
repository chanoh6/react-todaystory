import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategoryStories } from 'hooks/useStories';
import { useHistory } from 'hooks/useLocalStorage';
import { CardListSkeleton, Loading, TypeC } from 'components';
import style from 'styles/HistoryStories.module.css';
import { ArrowLeftIcon } from 'assets';

function HistoryStories() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { clearHistory } = useHistory();
  const { loading, error, category, contents } = useCategoryStories(6);

  if (loading || error) return <Loading />;

  return (
    <>
      {/* <header className={style.header}>
        <button className={style.icon} onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={12} height={20} style={{ marginRight: '2px' }} />
        </button>
        <h1>{t(`menu.history`)}</h1>
        <p onClick={clearHistory}>{t(`history.clear`)}</p>
      </header> */}

      <header className={style.header}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={12} height={20} />
        </button>
        <h1>{t(`menu.history`)}</h1>
        <p onClick={clearHistory}>{t(`history.clear`)}</p>
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

export default HistoryStories;
