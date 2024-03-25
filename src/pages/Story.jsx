import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { decode } from 'html-entities';
import { useAPI } from 'context/APIContext';
import { useFavorite, useHistory } from 'hooks/useLocalStorage';
import { useStory } from 'hooks/useStories';
import { StorySkeleton, MoreMenu, ShareModal, Loading, StoriesSkeleton } from 'components';
import { ArrowLeftIcon, LikeUnfilledIcon, ShareIcon, MoreIcon, ArrowTopIcon, LikeFilledIcon } from 'assets';
import { getInstagramCode } from 'utils/instagram';
import 'styles/Story.css';
import style from 'styles/Story.module.css';

const ChannelStories = React.lazy(() => import('components/ChannelStories'));
const BestStories = React.lazy(() => import('components/BestStories'));
const CategoryStories = React.lazy(() => import('components/CategoryStories'));

/**
 * @TODOS
 * 1. ? 스크롤 아래로 향하면 헤더 숨김, 스크롤 위로 향하면 헤더 표시
 */

const Story = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { api } = useAPI();
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
  const thumbnailURL = `${process.env.REACT_APP_THUMBNAIL_IMG_URL}${thumbnail}`;
  const logoURL = `${process.env.REACT_APP_LOGO_IMG_URL}${logo}`;
  const keyword = tag && tag.split('#').filter(Boolean).join(', ');
  const _title = decode(title);
  const _cp = decode(cp);
  const _category = decode(category);

  const moreMenuRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  // 조회수 업데이트
  const updateViewCount = async (idx) => {
    try {
      const res = await api.updateViewCount(idx);
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  // useRef?
  const onErrorImg = (e) => (e.target.src = process.env.REACT_APP_ERROR_IMG);
  const onErrorLogo = (e) => (e.target.src = process.env.REACT_APP_ERROR_LOGO);

  // 본문 내용 렌더링
  const renderHtml = (html, index) => {
    // HTML 엔티티 디코딩
    const decodedHtml = decode(html);

    // HTML 문자열을 파싱하여 DOM 요소 생성
    const parser = new DOMParser();
    const tempElement = parser.parseFromString(decodedHtml, 'text/html').body;

    // 'fr-embedly' 클래스를 포함하는 모든 요소 찾기
    const embedlyElements = tempElement.querySelectorAll('.fr-embedly');

    // 각 embedly 요소를 반복
    embedlyElements.forEach((embedlyElement) => {
      // href 속성 값 추출
      const href = embedlyElement.querySelector('a').getAttribute('href');

      // href에 'instagram.com'이 포함되어 있는지 확인
      if (href.includes('instagram.com')) {
        // Instagram 임베드 코드 생성
        const instagramCode = getInstagramCode(href);

        // Instagram 임베드 코드를 DOM 요소로 변환, 원래 요소 대체
        embedlyElement.replaceWith(parser.parseFromString(instagramCode, 'text/html').body);
      }
    });

    // 업데이트된 HTML 문자열 반환
    return (
      <article className={style.content} key={index + 1} dangerouslySetInnerHTML={{ __html: tempElement.innerHTML }} />
    );
  };

  // contentId가 변경될 때마다 실행
  useEffect(() => {
    saveHistory(contentId);
    updateViewCount(contentId);
  }, [contentId]);

  // Instagram 임베드 스크립트 로드
  useEffect(() => {
    if (data && window.instgrm) {
      // instrgrm이 정의되어 있으면 Instagram 임베드 스크립트 실행
      window.instgrm?.Embeds?.process();
    }
  }, [data]);

  //모달창 바깥 영역 클릭시 닫힘
  useEffect(() => {
    const handleClick = (e) => {
      if (isOpen && moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleTouchMove = (e) => {
      if (isOpen && moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen]);

  const handleMoreMenu = () => setIsOpen(!isOpen);
  const handleShareMenu = () => setShareOpen(!shareOpen);

  if (loading || error) return <Loading />;

  return (
    <>
      <Helmet>
        <meta name="keywords" content={keyword} />

        <meta property="og:title" content={`${t(`meta.title`)} - ${_title}`} />
        <meta property="og:image" content={thumbnailURL} />
        <meta property="og:url" content={`${process.env.REACT_APP_WEB_BASE_URL}${location.pathname}`} />

        <meta name="twitter:title" content={`${t(`meta.title`)} - ${_title}`} />
        <meta name="twitter:image" content={thumbnailURL} />

        <script async src="https://www.instagram.com/embed.js" />
      </Helmet>

      <header className={style.header}>
        <nav className={style.header__btn}>
          <button type="button" aria-label="back_button" className={style.icon} onClick={() => navigate(-1)}>
            <ArrowLeftIcon width={8} height={14} style={{ marginRight: '2px' }} />
          </button>
          <button type="button" aria-label="like_button" className={style.icon} onClick={saveFavorite}>
            {favorite ? (
              <LikeFilledIcon width={16} height={14} fill="var(--color-black)" style={{ marginBottom: '2px' }} />
            ) : (
              <LikeUnfilledIcon width={16} height={14} fill="var(--color-black)" style={{ marginBottom: '2px' }} />
            )}
          </button>
        </nav>

        <h1 onClick={() => navigate(`${process.env.REACT_APP_WEB_CHANNEL_URL}${cpIdx}`, { state: { title: cp } })}>
          {_cp}
        </h1>

        <nav className={style.header__btn}>
          <button type="button" aria-label="share_button" className={style.icon} onClick={handleShareMenu}>
            <ShareIcon style={{ marginBottom: '2px' }} />
          </button>
          <button
            type="button"
            aria-label="more_button"
            className={`${style.icon} ${isOpen ? style.active : ''}`}
            ref={moreMenuRef}
            onClick={handleMoreMenu}
          >
            <MoreIcon />
          </button>
        </nav>
      </header>

      {isOpen && <MoreMenu contents={data} />}
      {shareOpen && <ShareModal contents={data} onClose={handleShareMenu} />}

      {!data ? (
        <StorySkeleton />
      ) : (
        <main>
          <section className={style.content__wrap}>
            <h1 className={style.title}>{_title}</h1>
            <p className={style.editor}>by {editor || cp}</p>
            <p className={style.date}>{publishDate}</p>

            {/* <div className={style.content}>
              <img src={thumbnailURL} alt="thumbnail" onError={onErrorImg} />
            </div> */}

            {Object.keys(detail).map((key, index) => renderHtml(detail[key], index))}

            <div className={style.content__more}>
              <button
                type="button"
                aria-label="more_button"
                className={style.more}
                onClick={() => {
                  btnURL
                    ? window.open(btnURL, '_blank')
                    : navigate(`${process.env.REACT_APP_WEB_CHANNEL_URL}${cpIdx}`, { state: { title: cp } });
                }}
              >
                <div className="cp">
                  <img loading="lazy" src={logoURL} alt="cp logo" onError={onErrorLogo} />
                </div>
                <span>{btnTitle ? decode(btnTitle) : t(`detail.more-latest`, { channel: cp })}</span>
                <ArrowTopIcon style={{ rotate: '45deg' }} />
              </button>
            </div>
          </section>

          <Suspense fallback={<StoriesSkeleton />}>
            <section className={style.category__wrap}>
              <p>{t(`detail.more-from`)}</p>
              <ChannelStories idx={cpIdx} page={1} />
            </section>

            <section className={style.category__wrap}>
              <BestStories page={1} />
            </section>

            <section className={style.category__wrap}>
              <CategoryStories idx={categoryIdx} page={1} />
            </section>
          </Suspense>
        </main>
      )}

      <footer></footer>
    </>
  );
};

export default Story;
