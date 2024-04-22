import React from 'react';
import { useAPI } from 'context/APIContext';
import useFetchData from 'hooks/useFetchData';
import { StoriesSkeleton, TypeC } from 'components';
import style from 'styles/Stories.module.css';

const ChannelStories = (props) => {
  const size = process.env.REACT_APP_CHANNEL_STORIES_SIZE;
  const { idx, page } = props;
  const { api } = useAPI();
  // 채널 스토리 데이터
  const { data, error, isLoading } = useFetchData(
    () => api.channelStories(idx, page, 10),
    `channelStories-${idx}-${page}`,
  );

  if (isLoading || error || !data) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title}>{data.cp}</h1>
      </div>
      <ul className={style.list}>
        {data.contents.slice(0, size).map((content, i) => (
          <TypeC key={i} content={content} />
        ))}
      </ul>
    </>
  );
};

export default ChannelStories;
