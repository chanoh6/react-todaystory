import React from 'react';
import { useQuery } from 'react-query';
import { useAPI } from 'context/APIContext';
import { NoStories, StoriesSkeleton, TypeC } from 'components';
import style from 'styles/Stories.module.css';

const fetchChannelStories = async (api, idx, page, size) => {
  const storageKey = `channelStories-${idx}`;
  const storedData = localStorage.getItem(storageKey);
  const now = new Date().getTime();

  if (storedData) {
    const { lastFetched, data } = JSON.parse(storedData);
    const staleTime = 5 * 60 * 1000;

    if (now - lastFetched < staleTime) {
      return data;
    }
  }

  try {
    const response = await api.channelStories(idx, page, size);
    if (response.code !== '0') {
      throw new Error(`API error: ${response.msg[process.env.REACT_APP_LOCALE]}`);
    }
    const newData = response.data;
    
    localStorage.setItem(storageKey, JSON.stringify({
      lastFetched: now,
      data: newData
    }));

    return newData;
  } catch (error) {
    throw error;
  }
};

const ChannelStories = (props) => {
  const { idx, page } = props;
  const { api } = useAPI();
  const size = process.env.REACT_APP_CHANNEL_STORIES_SIZE;

  const { data, error, isLoading } = useQuery(
    ['channelStories', idx],
    () => fetchChannelStories(api, idx, page, size),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      onError: (error) => console.error(error),
    },
  );

  if (isLoading || error || !data) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title}>{data.cp}</h1>
      </div>
      <ul className={style.list}>
        {data.contents.map((content, i) => (
          <TypeC key={i} content={content} />
        ))}
      </ul>
    </>
  );
};

export default ChannelStories;
