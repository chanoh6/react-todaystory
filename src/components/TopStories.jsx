import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { StoriesSkeleton, TypeA, TypeB, TypeC } from 'components';
import style from 'styles/Stories.module.css';

const TopStories = () => {
  const { t } = useTranslation();
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const size = process.env.REACT_APP_TOP_STORIES_SIZE;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await api.topStories(size);
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
        <h1 className={style.title} style={{ color: `var(--color-dark-blue)` }}>
          {t(`main.top`)}
        </h1>
      </div>
      <ul className={style.list}>
        {data.contents.map((content, i) => {
          if (i === 0) {
            return <TypeA key={i} content={content} />;
          } else if (i === 1 || i === 2) {
            return <TypeB key={i} content={content} />;
          } else {
            return <TypeC key={i} content={content} />;
          }
        })}
      </ul>
    </>
  );
};

export default TopStories;
