import Skeleton from 'react-loading-skeleton';
import style from 'styles/FavoriteStories.module.css';
import card from 'styles/TypeC.module.css';

export default function CardList() {
  return (
    <section className={style.content__wrap}>
      <ul className={style.list}>
        {new Array(10).fill(1).map((_, i) => (
          <li key={i} className="card">
            <div className={card.card__info}>
              <div className={card.card__title}>
                <Skeleton width={'100px'}></Skeleton>
                <Skeleton count={2} width={'100%'}></Skeleton>
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
    </section>
  );
}