import { useEffect, useState } from 'react';
import { useTodaystoryApi } from '../context/TodaystoryApiContext';
import style from '../styles/CardList.module.css';
import CardL from '../components/CardL';
import CardM from '../components/CardM';
import CardS from '../components/CardS';

let baseContents = [];

for (let i = 0; i < 6; i++) {
  baseContents.push({
    idx: '',
    thumbnail: '',
    logo: '',
    channel: '',
    title: '',
    categoryIdx: '',
    category: '',
    publishedAt: '',
    viewCount: '',
  });
}

const getList = (type, contents) => {
  switch (type) {
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

function CardList({ list, title, index }) {
  const { todaystory } = useTodaystoryApi();
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setContents(null);

      try {
        switch (title) {
          case 'top':
            todaystory.top().then((res) => setContents(res));
            break;
          case 'best':
            todaystory.best(index).then((res) => setContents(res));
            break;
          case 'category':
            todaystory.category(index).then((res) => setContents(res));
            break;
          default:
            break;
        }
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <ul className={style.list}>로딩중</ul>;
  if (error) return <ul className={style.list}>에러가 발생했습니다</ul>;
  if (!contents) return <ul className={style.list}>{getList(list, baseContents)}</ul>;
  return <ul className={style.list}>{getList(list, contents)}</ul>;
}

export default CardList;
