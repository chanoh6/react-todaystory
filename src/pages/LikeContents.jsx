import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategoryStories } from 'hooks/useContents';
import { ContentListSkeleton, TypeC } from 'components';
import { BackIcon } from 'assets';
import style from 'styles/LikeContents.module.css';

function LikeContents() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading, error, category, contents } = useCategoryStories(6);

  return (
    <>
      <header className={style.header}>
        <button className={style.icon} onClick={() => navigate(-1)}>
          <BackIcon style={{ marginRight: '2px' }} />
        </button>
        <h1>{t(`menu.favorites`)}</h1>
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

export default LikeContents;
