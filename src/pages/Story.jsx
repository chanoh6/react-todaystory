import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useAPI2 } from 'context/APIContextTest';
import { useAdContext } from 'context/AdContext';
import useFetchData from 'hooks/useFetchDataTest';
import { decode } from 'html-entities';
import { useFavorite, useHistory } from 'hooks/useLocalStorage';
import { getInstagramCode } from 'utils/instagram';
import { StorySkeleton, MoreMenu, ShareModal, Loading, StoriesSkeleton } from 'components';
import { ArrowLeftIcon, LikeUnfilledIcon, ShareIcon, MoreIcon, ArrowTopIcon, LikeFilledIcon } from 'assets';
import 'styles/Story.css';
import style from 'styles/Story.module.css';
import adStyle from 'styles/Ad.module.css';
import GenericAd from 'components/Ad/GenericAd';
import AnchorAd from 'components/Ad/AnchorAd';
import BelowImageAd from 'components/Ad/BelowImageAd';

const ChannelStories = React.lazy(() => import('components/ChannelStories'));
const BestStories = React.lazy(() => import('components/BestStories'));
const CategoryStories = React.lazy(() => import('components/CategoryStories'));

const Story = () => {
  const { contentId } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { api } = useAPI2();
  // 상세 스토리 데이터
  const { data, error, isLoading } = useFetchData(() => api.story({ idx: contentId }), `story-${contentId}`);
  const [main, setMain] = useState(null);
  const [keyword, setKeyword] = useState('');
  const { adHeight, setAdHeight } = useAdContext();
  const [moreOpen, setMoreOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { favorite, saveFavorite } = useFavorite(contentId);
  const { saveHistory } = useHistory();
  const moreMenuRef = useRef(null);
  const footerRef = useRef(null);

  // 이미지 로딩 실패 시 대체 이미지로 교체
  const onErrorImg = (e) => {
    const thumbnailURL = `${process.env.REACT_APP_THUMBNAIL_IMG_URL2}${data.thumbnail}`;
    const errorURL = process.env.REACT_APP_ERROR_IMG;

    if (e.target.src !== thumbnailURL) {
      e.target.src = thumbnailURL;
      e.target.onerror = (errorEvent) => {
        if (errorEvent.target.src !== errorURL) {
          errorEvent.target.src = errorURL;
          // 더 이상의 onerror 처리가 없도록 설정
          errorEvent.target.onerror = null;
        }
      };
    }
  };

  const onErrorLogo = (e) => {
    const logoURL = `${process.env.REACT_APP_LOGO_IMG_URL2}${data.logo}`;
    const errorURL = process.env.REACT_APP_ERROR_LOGO;

    if (e.target.src !== logoURL) {
      e.target.src = logoURL;
      e.target.onerror = (errorEvent) => {
        if (errorEvent.target.src !== errorURL) {
          errorEvent.target.src = errorURL;
          // 더 이상의 onerror 처리가 없도록 설정
          errorEvent.target.onerror = null;
        }
      };
    }
  };

  // 조회수 업데이트
  const updateViewCount = async (idx) => {
    try {
      const res = await api.updateViewCount({ idx });
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  // 더보기수 업데이트
  const updateMoreCount = async (idx) => {
    try {
      const res = await api.updateMoreCount({ idx });
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  // 뒤로가기 버튼 클릭
  const handleBack = () => navigate(-1);

  // 더보기 메뉴 클릭
  const handleMoreMenu = () => setMoreOpen(!moreOpen);

  // 공유 버튼 클릭
  const handleShareMenu = () => setShareOpen(!shareOpen);

  // 더보기 버튼 클릭
  const handleMoreButton = () => {
    updateMoreCount(contentId);
    if (data.btnURL) {
      window.open(data.btnURL, '_blank');
    } else {
      navigate(`${process.env.REACT_APP_WEB_CHANNEL_URL}${data.cpIdx}`, { state: { title: data.cp } });
    }
  };

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

  // Instagram 임베드 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // contentId가 변경될 때마다 실행
  useEffect(() => {
    saveHistory(contentId);
    updateViewCount(contentId);
  }, [contentId]);

  // keyword 설정 및 Instagram 임베드 스크립트 로드
  useEffect(() => {
    if (!data) return;

    // 태그가 있으면 '#'을 제거하고 콤마로 구분하여 키워드에 저장
    setKeyword(data.tag && data.tag.split('#').filter(Boolean).join(', '));

    const mainContent = Object.keys(data.detail).map((key, index) => renderHtml(data.detail[key], index));
    setMain(mainContent);
  }, [data]);

  // main이 변경될 때마다 실행
  useEffect(() => {
    // instrgrm이 정의되어 있으면 Instagram 임베드 스크립트 실행
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [main]);

  //모달창 바깥 영역 클릭시 닫힘
  useEffect(() => {
    const handleClick = (e) => {
      if (moreOpen && moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };

    const handleTouchMove = (e) => {
      if (moreOpen && moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [moreOpen]);

  // 광고 높이만큼 footer padding 설정
  useEffect(() => {
    if (!adHeight || !footerRef.current) return;
    footerRef.current.style.paddingBottom = `${adHeight}px`;
  }, [adHeight, setAdHeight, footerRef.current]);

  if (isLoading) return <Loading />;
  if (error) return null;
  if (!data) return <StorySkeleton />;

  return (
    <>
      <Helmet>
        <meta name="keywords" content={keyword} />

        <meta property="og:title" content={`${t(`meta.title`)} - ${decode(data.title)}`} />
        <meta property="og:image" content={`${process.env.REACT_APP_THUMBNAIL_IMG_URL}${data.thumbnail}`} />
        <meta property="og:url" content={`${process.env.REACT_APP_WEB_BASE_URL}${location.pathname}`} />

        <meta name="twitter:title" content={`${t(`meta.title`)} - ${decode(data.title)}`} />
        <meta name="twitter:image" content={`${process.env.REACT_APP_THUMBNAIL_IMG_URL}${data.thumbnail}`} />
      </Helmet>

      <header className={style.header}>
        <nav className={style.header__btn}>
          <button type="button" aria-label="back_button" className={style.icon} onClick={handleBack}>
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

        <h1
          onClick={() =>
            navigate(`${process.env.REACT_APP_WEB_CHANNEL_URL}${data.cpIdx}`, { state: { title: data.cp } })
          }
        >
          {decode(data.cp)}
        </h1>

        <nav className={style.header__btn}>
          <button type="button" aria-label="share_button" className={style.icon} onClick={handleShareMenu}>
            <ShareIcon style={{ marginBottom: '2px' }} />
          </button>
          <button
            type="button"
            aria-label="more_button"
            className={`${style.icon} ${moreOpen ? style.active : ''}`}
            ref={moreMenuRef}
            onClick={handleMoreMenu}
          >
            <MoreIcon />
          </button>
        </nav>
      </header>

      {!data ? (
        <StorySkeleton />
      ) : (
        <main>
          <section className={style.content__wrap}>
            <h1 className={style.title}>{decode(data.title)}</h1>
            <p className={style.editor}>by {data.editor || data.cp}</p>
            <p className={style.date}>{data.publishDate}</p>

            {/* <BelowImageAd /> */}
            <GenericAd
              adSlotId="div-gpt-ad-1613117154866-0"
              adSizes={[
                [320, 100],
                [320, 50],
              ]}
              adUnitPath="/284705699/Samsung_life/Samsung_KR_life_viewer_below_image"
              adStyle={adStyle.ad__below}
            />

            {/* {Object.keys(data.detail).map((key, index) => renderHtml(data.detail[key], index))} */}
            {main}

            <div className={style.content__more}>
              <button type="button" aria-label="more_button" className={style.more} onClick={handleMoreButton}>
                <div className="cp">
                  <img
                    loading="lazy"
                    src={`${process.env.REACT_APP_LOGO_IMG_URL}${data.logo}`}
                    alt="cp logo"
                    onError={onErrorLogo}
                  />
                </div>
                <span>{data.btnTitle ? decode(data.btnTitle) : t(`detail.more-latest`, { channel: data.cp })}</span>
                <ArrowTopIcon style={{ rotate: '45deg' }} />
              </button>
            </div>
          </section>

          <Suspense fallback={<StoriesSkeleton />}>
            <section className={style.category__wrap}>
              <p>{t(`detail.more-from`)}</p>
              <ChannelStories idx={data.cpIdx} page={1} />
            </section>

            <section className={style.category__wrap}>
              <BestStories page={1} />
            </section>

            <section className={style.category__wrap}>
              <CategoryStories idx={data.categoryIdx} page={1} />
            </section>
          </Suspense>
        </main>
      )}

      <footer ref={footerRef}>
        <AnchorAd />
        {/* <GenericAd
          adSlotId="div-gpt-ad-1573457886200-0"
          adSizes={[
            [320, 50],
            [320, 100],
          ]}
          adUnitPath="/284705699/Samsung_life/Samsung_life_anchor"
          adStyle={adStyle.ad__anchor}
        /> */}
      </footer>

      {moreOpen && <MoreMenu contents={data} />}
      {shareOpen && <ShareModal contents={data} onClose={handleShareMenu} />}
    </>
  );
};

export default Story;
