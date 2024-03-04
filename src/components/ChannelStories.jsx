import { StoriesSkeleton, TypeC } from 'components';
import style from 'styles/Stories.module.css';
import { useBestStories } from 'hooks/useContents';

function ChannelStories({ title }) {
  const { loading, error, contents } = useBestStories(1);

  if (loading || error || !contents) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title}>{title}</h1>
      </div>
      <ul className={style.list}>
        {contents.map((content, i) => (
          <TypeC key={i} content={content} />
        ))}
      </ul>
    </>
  );
}

export default ChannelStories;
