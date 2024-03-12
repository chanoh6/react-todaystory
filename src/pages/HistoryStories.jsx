import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHistoryStories } from 'hooks/useStories';
import { useHistory } from 'hooks/useLocalStorage';
import { CardListSkeleton, Loading, TypeC } from 'components';
import style from 'styles/HistoryStories.module.css';
import { ArrowLeftIcon } from 'assets';

function HistoryStories() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { clearHistory, getHistory } = useHistory();
  const idxList = getHistory();
  console.log(idxList);
  // const { loading, error, data } = useCategoryStories(6, 1, 10);
  const { loading, error, data } = useHistoryStories(idxList);
  const { contents } = data;

  if (loading || error) return <Loading />;

  return (
    <>
      {/* <header className={style.header}>
        <button className={style.icon} onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={10} height={18} style={{ marginRight: '2px' }} />
        </button>
        <h1>{t(`menu.history`)}</h1>
        <p onClick={clearHistory}>{t(`history.clear`)}</p>
      </header> */}

      <header className={style.header}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={10} height={18} />
        </button>
        <h1>{t(`menu.history`)}</h1>
        <p onClick={clearHistory}>{t(`history.clear`)}</p>
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

export default HistoryStories;
