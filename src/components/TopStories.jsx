import { useEffect, useState } from 'react';
import { useApi } from 'context/ApiContext';
import { StoriesSkeleton, TypeA, TypeB, TypeC } from 'components';
import { useTranslation } from 'react-i18next';
import style from 'styles/Stories.module.css';

function TopStories() {
  const { t, i18n } = useTranslation();
  const { api } = useApi();
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setContents(null);

      try {
        return api.top(lang);
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
        <h1 className={style.title}>{t(`main.top`)}</h1>
      </div>
      <ul className={style.list}>
        <TypeA key={0} content={contents[0]} />
        <TypeB key={1} content={contents[1]} />
        <TypeB key={2} content={contents[2]} />
        <TypeC key={3} content={contents[3]} />
        <TypeC key={4} content={contents[4]} />
        <TypeC key={5} content={contents[5]} />
      </ul>
    </>
  );
}

export default TopStories;
