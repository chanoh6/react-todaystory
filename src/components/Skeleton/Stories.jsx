import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import style from 'styles/Stories.module.css';
import 'styles/Card.css';
import card from 'styles/TypeC.module.css';

const Stories = () => {
  return (
    <>
      <Skeleton className={style.title} width={'150px'}></Skeleton>
      <ul className={style.list}>
        {new Array(4).fill(1).map((_, i) => (
          <li key={i} className="card">
            <div className={card.card__info}>
              <div className={card.card__title}>
                <Skeleton width={'100px'}></Skeleton>
                <Skeleton count={3} width={'100%'}></Skeleton>
              </div>
              <div className={card.thumbnail}>
                <Skeleton height={'100%'} />
              </div>
            </div>
            <div className="card__more">
              <Skeleton width={'50px'}></Skeleton>
              <Skeleton width={'50px'}></Skeleton>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Stories;
