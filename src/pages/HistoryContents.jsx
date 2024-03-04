import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategoryStories } from 'hooks/useContents';
import { ContentListSkeleton, TypeC } from 'components';
import { useHistory } from 'hooks/useHistory';
import { ReactComponent as BackIcon } from 'assets/icon/Back.svg';
import style from 'styles/HistoryContents.module.css';

function HistoryContents() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { clearHistory } = useHistory();
  const { loading, error, category, contents } = useCategoryStories(6);

  return (
    <>
      <header className={style.header}>
        <button className={style.icon} onClick={() => navigate(-1)}>
          <BackIcon style={{ marginRight: '2px' }} />
        </button>
        <h1>{t(`menu.history`)}</h1>
        <p onClick={clearHistory}>{t(`history.clear`)}</p>
      </header>
      <main>
        {loading || error || !contents.contents ? (
          <ContentListSkeleton />
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

export default HistoryContents;
