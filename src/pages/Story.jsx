import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { decode } from 'html-entities';
import { useFavorite, useHistory } from 'hooks/useLocalStorage';
import { useStory } from 'hooks/useStories';
import { StorySkeleton, BestStories, CategoryStories, ChannelStories, MoreMenu, Loading, MoreButton } from 'components';
import { ArrowLeftIcon, LikeUnfilledIcon, ShareIcon, MoreIcon, ArrowTopIcon, LikeFilledIcon } from 'assets';
import cn from 'classnames';
import 'styles/Story.css';
import 'styles/Story.css';
import style from 'styles/Story.module.css';
import ShareModal from 'components/Modal/ShareModal';

/**
 * @TODOS
 * 1. 콘텐츠 상세 api 연결
 * 2. 스크롤 아래로 향하면 헤더 숨김, 스크롤 위로 향하면 헤더 표시
 * -- 3. 좋아요 기능 추가
 * 4. 공유 기능 추가
 * 5. 더보기 메뉴 추가
 * 6. 에디터 스타일
 * 7. 아이콘 통합 정리
 */

const onErrorImg = (e) => (e.target.src = '/assets/no_image.png');

function Story() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { contentId } = useParams();
  const { favorite, saveFavorite } = useFavorite(contentId);
  const { saveHistory } = useHistory();
  const { loading, error, data } = useStory(contentId);
  const {
    categoryIdx,
    category,
    cpIdx,
    cp,
    logo,
    thumbnail,
    url,
    title,
    detail,
    editor,
    publishDate,
    tag,
    btnURL,
    btnTitle,
    noindex,
    externalLink,
  } = data;
  const thumbnailURL = `${process.env.REACT_APP_BASE_IMG_URL}Thumbnail/${thumbnail}`;
  const logoURL = `${process.env.REACT_APP_BASE_IMG_URL}cp/${logo}`;

  const moreMenuRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(0);

  const renderHtml = (htmlString, index) => {
    const html = decode(htmlString);
    return <div className={style.content} key={index} dangerouslySetInnerHTML={{ __html: html }} />;
  };

  useEffect(() => {
    saveHistory(contentId);
  }, []);

  //모달창 바깥 영역 클릭시 닫힘
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (isOpen && moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('touchmove', handleTouchMove);
    // document.addEventListener('mousedown', handleTouchMove);
    // document.addEventListener('scroll', handleTouchMove);
    // document.addEventListener('keydown', handleTouchMove);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      // document.removeEventListener('mousedown', handleTouchMove);
      // document.removeEventListener('scroll', handleTouchMove);
      // document.removeEventListener('keydown', handleTouchMove);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [isScroll]);

  const handleMoreMenu = () => setIsOpen(!isOpen);
  const handleShareMenu = () => setShareOpen(!shareOpen);

  if (loading || error) return <Loading />;

  return (
    <>
      <header className={style.header}>
        <div className={style.header__btn}>
          <button className={style.icon} onClick={() => navigate(-1)}>
            <ArrowLeftIcon width={8} height={14} style={{ marginRight: '2px' }} />
          </button>
          <button className={style.icon} onClick={saveFavorite}>
            {favorite ? (
              <LikeFilledIcon width={16} height={14} fill="var(--color-black)" style={{ marginBottom: '2px' }} />
            ) : (
              <LikeUnfilledIcon width={16} height={14} fill="var(--color-black)" style={{ marginBottom: '2px' }} />
            )}
          </button>
        </div>

        <h1 onClick={() => navigate(`${process.env.REACT_APP_WEB_CHANNEL_URL}${cpIdx}`, { state: { title: cp } })}>
          {cp}
        </h1>

        <div className={style.header__btn}>
          <button className={style.icon} onClick={handleShareMenu}>
            <ShareIcon style={{ marginBottom: '2px' }} />
          </button>
          <button className={cn(style.icon, isOpen && style.active)} ref={moreMenuRef} onClick={handleMoreMenu}>
            <MoreIcon />
          </button>
        </div>
      </header>
      
      {isOpen && <MoreMenu />}
      {shareOpen && <ShareModal contents={data} onClose={handleShareMenu} />}

      {!data ? (
        <StorySkeleton />
      ) : (
        <main>
          <section className={style.content__wrap}>
            <h1 className={style.title}>{decode(title)}</h1>
            <p className={style.editor}>by {editor || cp}</p>
            <p className={style.date}>{publishDate}</p>

            <div className={style.content}>
              <img src={thumbnailURL} alt="thumbnail" />
            </div>

            {Object.keys(detail).map((key, index) => renderHtml(detail[key], index))}

            <div className={style.content__more}>
              <button
                className={style.more}
                onClick={() => navigate(`${process.env.REACT_APP_WEB_CHANNEL_URL}${cpIdx}`, { state: { title: cp } })}
              >
                <div className="cp">
                  <img src={logoURL} alt="cp logo" onError={onErrorImg} />
                </div>
                <span>{t(`detail.more-latest`, { channel: cp })}</span>
                <ArrowTopIcon style={{ rotate: '45deg' }} />
              </button>
            </div>
          </section>

          <section className={style.category__wrap}>
            {loading ? '' : <p>{t(`detail.more-from`)}</p>}
            <ChannelStories idx={cpIdx} page={1} size={4} />
          </section>

          <section className={style.category__wrap}>
            <BestStories page={1} size={4} />
          </section>

          <section className={style.category__wrap}>
            <CategoryStories list={3} idx={categoryIdx} page={1} size={4} />
          </section>
        </main>
      )}

      <footer></footer>
    </>
  );
}
export default Story;
