import style from 'styles/ContentDetail.module.css';
import Skeleton from 'react-loading-skeleton';

export default function ContentDetail() {
  return (
    <section className={style.content__wrap}>
      <Skeleton width={'100%'} height={'24px'} style={{ marginBottom: '4px' }} />
      <Skeleton width={'80%'} height={'24px'} style={{ marginBottom: '14px' }} />
      <Skeleton width={'100px'} height={'16px'} style={{ marginBottom: '4px' }} />
      <Skeleton width={'140px'} height={'14px'} />
      <Skeleton width={'100%'} height={'300px'} style={{ margin: '20px 0' }} />
      <Skeleton width={'100%'} style={{ marginBottom: '4px' }} />
      <Skeleton width={'100%'} style={{ marginBottom: '4px' }} />
      <Skeleton width={'60%'} />
    </section>
  );
}