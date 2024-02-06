import { useLocation, useNavigate, useParams } from 'react-router-dom';
import style from '../styles/ContentDetail.module.css';
import ContentList from '../components/ContentList';
import { ReactComponent as BackIcon } from '../assets/icon/Back.svg';
import { ReactComponent as LikeIcon } from '../assets/icon/Like.svg';
import { ReactComponent as ShareIcon } from '../assets/icon/Share.svg';
import { ReactComponent as MoreIcon } from '../assets/icon/More.svg';
import { ReactComponent as ArrowTopIcon } from '../assets/icon/ArrowTop.svg';
import { useEffect, useState } from 'react';
import DetailSkeleton from '../components/DetailSkeleton';

/**
 * @TODOS
 * 1) 스크롤 아래로 향하면 헤더 숨김, 스크롤 위로 향하면 헤더 표시
 * 2) 좋아요 기능 추가
 * 3) 공유 기능 추가
 * 4) 더보기 메뉴 추가
 * 5) 에디터 스타일
 * 6) 아이콘 통합 정리
 */

function ContentDetail() {
  // for test
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    state: { content },
  } = useLocation();
  const navigate = useNavigate();
  const { idx, thumbnail, logo, channel, title, categoryIdx, category, publishedAt, viewCount } = content;
  const baseURL = 'https://picks.my/ko/s/';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setPost(null);
    };

    fetchData().then(() => {
      setPost(true);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  }, []);

  return (
    <>
      <header className={style.header}>
        <div className={style.header__btn}>
          <button className={style.icon} onClick={() => navigate(-1)}>
            <BackIcon style={{ marginRight: '1px' }} />
          </button>
          <button className={style.icon}>
            <LikeIcon width={14} height={14} fill="black" />
          </button>
        </div>
        <h1 onClick={() => navigate(`/${channel}`)}>{channel}</h1>
        <div className={style.header__btn}>
          <button className={style.icon}>
            <ShareIcon style={{ marginBottom: '1px' }} />
          </button>
          <button className={style.icon}>
            <MoreIcon />
          </button>
        </div>
      </header>
      <main>
        {loading || error || !post ? (
          <DetailSkeleton />
        ) : (
          <section className={style.content__wrap}>
            <h1 className={style.title}>{title}</h1>
            <p className={style.editor}>by editor</p>
            <p className={style.date}>{publishedAt}</p>
            <div className={style.content}>
              <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="thumbnail" />
              <p>
                <strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
                Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
                undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                Malorum" &#40;The Extremes of Good and Evil&#41; by Cicero, written in 45 BC. This book is a treatise on
                the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum
                dolor sit amet..", comes from a line in section 1.10.32.
              </p>
              <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="thumbnail" />
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                of letters, as opposed to using 'Content here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
                evolved over the years, sometimes by accident, sometimes on purpose &#40;injected humour and the
                like&#41;.
              </p>
            </div>
            <div className={style.content__more}>
              <button className={style.more} onClick={() => navigate(`/${channel}`)}>
                <span>&lt;{channel}&gt; 최신 기사 읽기</span>
                <ArrowTopIcon style={{ rotate: '45deg' }} />
              </button>
            </div>
          </section>
        )}
        <section className={style.category__wrap}>
          {loading ? '' : <p>더 알아보기</p>}
          <ContentList list={4} type="best" title={channel} index={1} more={false} />
        </section>
        <section className={style.category__wrap}>
          <ContentList list={4} type="best" title="best stories" index={2} more={false} />
        </section>
        <section className={style.category__wrap}>
          {/* index={categoryIdx} */}
          <ContentList list={4} type="category" title={category} index={12} more={true} />
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default ContentDetail;
