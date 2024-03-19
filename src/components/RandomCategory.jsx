import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAPI } from 'context/APIContext';
import { StoriesSkeleton, TypeA, TypeB, TypeC } from 'components';
import { ArrowRightIcon } from 'assets';
import style from 'styles/Stories.module.css';

const RandomCategory = (props) => {
  const { idx } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [randomCount, setRandomCount] = useState(getRandomCount());

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await api.categoryStories(idx, 1, randomCount);
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
        <h1 className={style.title} style={{ color: data.color }}>
          {data.category}
        </h1>
        <button
          type="button"
          aria-label="more_button"
          className={style.btn__more}
          onClick={() =>
            navigate(`${process.env.REACT_APP_WEB_CATEGORY_URL}${data.categoryIdx}`, {
              state: { title: data.category },
            })
          }
        >
          <p>{t(`main.more`)}</p>
          <ArrowRightIcon width={6} height={10} />
        </button>
      </div>
      <ul className={style.list}>{getRandomComponents(data.contents)}</ul>
    </>
  );
};

const getRandomCount = () => Math.floor(Math.random() * (5 - 3 + 1)) + 3;

const getRandomComponents = (contents) => {
  const components = [];
  let typeCStarted = false;

  for (let i = 0; i < contents.length; i++) {
    const content = contents[i];

    // if (i === 0 && Math.random() < 0.5 && !typeCStarted) {
    if (i === 0 && !typeCStarted) {
      components.push(<TypeA key={i} content={content} />);
    } else if (i < contents.length - 1 && Math.random() < 0.5 && !typeCStarted) {
      components.push(<TypeB key={i} content={content} />);
      components.push(<TypeB key={i + 1} content={contents[i + 1]} />);
      i += 1;
    } else {
      typeCStarted = true;
      components.push(<TypeC key={i} content={content} />);
    }
  }

  return components;
};

export default RandomCategory;
