import { useNavigate, useParams } from 'react-router-dom';
import { useChannelStories } from 'hooks/useStories';
import { CardListSkeleton, Loading, Menu, MenuButton, TypeC } from 'components';
import { ArrowLeftIcon } from 'assets';
import style from 'styles/CategoryStories.module.css';

const ChannelStories = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useChannelStories(pageId, 1, 10);
  const { cp, cpIdx, contents } = data || {};

  if (loading || error) return <Loading />;

  return (
    <>
      <header className={style.header}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={10} height={18} />
        </button>
        <h1>{cp}</h1>
        <MenuButton />
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

export default ChannelStories;
