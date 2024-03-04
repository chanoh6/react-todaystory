import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ContentDetailSkeleton, BestStories, CategoryStories, ChannelStories, MoreMenu } from 'components';
import { BackIcon, LikeUnfilledIcon, ShareIcon, MoreIcon, ArrowTopIcon, LikeFilledIcon } from 'assets';
import style from 'styles/ContentDetail.module.css';
import { useFavorite } from 'hooks/favorite';
import { useHistory } from 'hooks/history';
import { useLoading } from 'hooks/loading';
import Loading from 'components/Loading';

/**
 * @TODOS
 * 1. 콘텐츠 상세 api 연결
 * 2. 스크롤 아래로 향하면 헤더 숨김, 스크롤 위로 향하면 헤더 표시
 * 3. 좋아요 기능 추가
 * 4. 공유 기능 추가
 * 5. 더보기 메뉴 추가
 * 6. 에디터 스타일
 * 7. 아이콘 통합 정리
 */

const onErrorImg = (e) => (e.target.src = '/assets/no_image.png');

function ContentDetail() {
  const { t } = useTranslation();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const {
    state: { content },
  } = useLocation();
  const navigate = useNavigate();
  const spinner = useLoading();
  const { idx, thumbnail, channelIdx, channel, title, category, publishedAt, logo } = content;
  const baseURL = process.env.REACT_APP_BASE_IMG_URL;
  const { favorite, saveFavorite } = useFavorite(idx);
  const { saveHistory } = useHistory(idx);
  const menuModalRef = useRef();
  const [isScroll, setScroll] = useState(0);

  saveHistory(idx);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setInfo(null);
    };

    fetchData().then(() => {
      setInfo(true);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    setOpen(false);
  }, [isScroll]);

  //모달창 바깥 영역 클릭시 닫힘
  useEffect(() => {
    const clickOutside = (e) => {
      if (isOpen && menuModalRef.current && !menuModalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {spinner ? (
        <Loading />
      ) : (
        <>
          <header className={style.header}>
            <div className={style.header__btn} ref={menuModalRef}>
              <button className={style.icon} onClick={() => navigate(-1)}>
                <BackIcon style={{ marginRight: '2px' }} />
              </button>
              <button className={style.icon} onClick={saveFavorite}>
                {favorite ? (
                  <LikeFilledIcon width={14} height={14} fill="black" />
                ) : (
                  <LikeUnfilledIcon width={14} height={14} fill="black" />
                )}
              </button>
            </div>
            <h1 onClick={() => navigate(`/${channelIdx}`, { state: { title: channel } })}>{channel}</h1>
            <div className={style.header__btn}>
              <button className={style.icon}>
                <ShareIcon style={{ marginBottom: '2px' }} />
              </button>
              <button className={style.icon} onClick={() => setOpen(!isOpen)}>
                <MoreIcon />
              </button>
            </div>
          </header>
          {isOpen ? <MoreMenu /> : ''}
          <main>
            {loading || error || !info ? (
              <ContentDetailSkeleton />
            ) : (
              <section className={style.content__wrap}>
                <h1 className={style.title}>{title}</h1>
                <p className={style.editor}>by editor</p>
                <p className={style.date}>{publishedAt}</p>
                <div className={style.content}>
                  <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="thumbnail" />
                  <p>
                    <strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
                    a galley of type and scrambled it to make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                    more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                    Ipsum.
                  </p>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                    professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
                    literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                    of "de Finibus Bonorum et Malorum" &#40;The Extremes of Good and Evil&#41; by Cicero, written in 45
                    BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first
                    line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                  </p>
                  <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="thumbnail" />
                  <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution of letters, as opposed to using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                    default model text, and a search for 'lorem ipsum' will uncover many web sites still in their
                    infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                    &#40;injected humour and the like&#41;.
                  </p>
                </div>
                <div className={style.content__more}>
                  <button
                    className={style.more}
                    onClick={() => navigate(`/${channelIdx}`, { state: { title: channel } })}
                  >
                    <div className="cp">
                      <img src={`${baseURL}cp/${logo}`} alt="cp logo" onError={onErrorImg} />
                    </div>
                    <span>{t(`detail.more-latest`, { channel })}</span>
                    <ArrowTopIcon style={{ rotate: '45deg' }} />
                  </button>
                </div>
              </section>
            )}
            <section className={style.category__wrap}>
              {loading ? '' : <p>{t(`detail.more-from`)}</p>}
              <ChannelStories title={channel} />
            </section>
            <section className={style.category__wrap}>
              <BestStories start={1} />
            </section>
            <section className={style.category__wrap}>
              <CategoryStories list={3} index={12} />
            </section>
          </main>
          <footer></footer>
        </>
      )}
    </>
  );
}

export default ContentDetail;
