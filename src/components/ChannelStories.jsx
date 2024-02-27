import { useEffect, useState } from 'react';
import { useApi } from 'context/ApiContext';
import { StoriesSkeleton, TypeC } from 'components';
import style from 'styles/Stories.module.css';

function ChannelStories({ title }) {
  const { api } = useApi();
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setContents(null);

      try {
        return api.best(1);
      } catch (e) {
        setError(e);
      }
    };

    fetchData().then((res) => {
      setContents(res);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  }, []);

  if (loading || error || !contents) return <StoriesSkeleton />;

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title}>{title}</h1>
      </div>
      <ul className={style.list}>
        <TypeC key={0} content={contents[0]} />
        <TypeC key={1} content={contents[1]} />
        <TypeC key={2} content={contents[2]} />
        <TypeC key={3} content={contents[3]} />
      </ul>
    </>
  );
}

export default ChannelStories;
