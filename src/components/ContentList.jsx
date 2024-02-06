import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaystoryApi } from '../context/TodaystoryApiContext';
import style from '../styles/ContentList.module.css';
import { ReactComponent as ArrowRightIcon } from '../assets/icon/ArrowRight.svg';
import CardL from './CardL';
import CardM from './CardM';
import CardS from './CardS';
import ListSkeleton from './ListSkeleton';

function ContentList({ list, type, title, index, more }) {
  const navigate = useNavigate();
  const { todaystory } = useTodaystoryApi();
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setContents(null);

      try {
        switch (type) {
          case 'top':
            return todaystory.top();
          case 'best':
            return todaystory.best(index);
          case 'category':
            return todaystory.category(index);
          case 'channel':
            return todaystory.channel(index);
          default:
            break;
        }
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

  const getList = () => {
    switch (list) {
      case 1:
        return (
          <>
            <CardL key={0} content={contents[0]} />
            <CardM key={1} content={contents[1]} />
            <CardM key={2} content={contents[2]} />
            <CardS key={3} content={contents[3]} />
            <CardS key={4} content={contents[4]} />
            <CardS key={5} content={contents[5]} />
          </>
        );
      case 2:
        return (
          <>
            <CardL key={0} content={contents[0]} />
            <CardM key={1} content={contents[1]} />
            <CardM key={2} content={contents[2]} />
            <CardS key={3} content={contents[3]} />
          </>
        );
      case 3:
        return (
          <>
            <CardL key={0} content={contents[0]} />
            <CardS key={1} content={contents[1]} />
            <CardS key={2} content={contents[2]} />
            <CardS key={3} content={contents[3]} />
          </>
        );
      case 4:
        return (
          <>
            <CardS key={0} content={contents[0]} />
            <CardS key={1} content={contents[1]} />
            <CardS key={2} content={contents[2]} />
            <CardS key={3} content={contents[3]} />
          </>
        );
      default:
        return;
    }
  };

  return (
    <>
      {loading || error || !contents ? (
        <ListSkeleton />
      ) : (
        <>
          <div className={style.content__title}>
            <h1 className={style.title}>{title}</h1>
            {!more ? (
              ''
            ) : (
              <button className={style.btn__more} onClick={() => navigate(`/${index}`, { state: { idx: index } })}>
                <p>더보기</p>
                <ArrowRightIcon />
              </button>
            )}
          </div>
          <ul className={style.list}>{getList()}</ul>
        </>
      )}
    </>
  );
}

export default ContentList;
