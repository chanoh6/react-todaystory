import { StoriesSkeleton, TypeC } from 'components';
import style from 'styles/Stories.module.css';
import { useChannelStories } from 'hooks/useStories';

const ChannelStories = (props) => {
  const { idx, page, size } = props;
  const { loading, error, data } = useChannelStories(idx, page, size);
  const { cp, contents } = data;

  if (loading || error || !contents) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title}>{cp}</h1>
      </div>
      <ul className={style.list}>
        {contents.map((content, i) => (
          <TypeC key={i} content={content} />
        ))}
      </ul>
    </>
  );
};

export default ChannelStories;
