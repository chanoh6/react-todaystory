import { NoStories, StoriesSkeleton, TypeC } from 'components';
import style from 'styles/Stories.module.css';
import { useChannelStories } from 'hooks/useStories';
import { useAPI } from 'context/APIContext';
import { useEffect, useState } from 'react';

const ChannelStories = (props) => {
  const { idx, page } = props;
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const size = process.env.REACT_APP_CHANNEL_STORIES_SIZE;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await api.channelStories(idx, page, size);
      return res;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then((res) => {
      if (res.code === '0') {
        setData(res.data);
      } else {
        console.log(`API error: ${res.msg[process.env.REACT_APP_LOCALE]}`);
      }
    });
  }, []);

  if (loading || error || !data) return <StoriesSkeleton />;

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
