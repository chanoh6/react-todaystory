import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useAPI2 } from 'context/APIContextTest';
import { useAdContext } from 'context/AdContext';
import useFetchData from 'hooks/useFetchDataTest';
import { useFavorite, useHistory } from 'hooks/useLocalStorage';
import { decode } from 'html-entities';
import { getInstagramCode } from 'utils/instagram';
import { StorySkeleton, MoreMenu, ShareModal, Loading, StoriesSkeleton } from 'components';
import { ArrowLeftIcon, LikeUnfilledIcon, ShareIcon, MoreIcon, ArrowTopIcon, LikeFilledIcon } from 'assets';
import 'styles/Story.css';
import style from 'styles/Story.module.css';
import adStyle from 'styles/Ad.module.css';
import NotFound from './NotFound';

const ChannelStories = React.lazy(() => import('components/ChannelStories'));
const BestStories = React.lazy(() => import('components/BestStories'));
const CategoryStories = React.lazy(() => import('components/CategoryStories'));

const Story = () => {
  const { contentId } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { api } = useAPI2();
  const { isPWTLoaded } = useAdContext();
  // 상세 스토리 데이터
  const { data, error, isLoading } = useFetchData(() => api.story({ idx: contentId }), `story-${contentId}`);
  const [main, setMain] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [isWidget, setIsWidget] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { favorite, saveFavorite } = useFavorite(contentId);
  const { saveHistory } = useHistory();
  const { adHeight, setAdHeight } = useAdContext();
  const moreMenuRef = useRef(null);
  const footerRef = useRef(null);

  // 이미지 로딩 실패 시 대체 이미지로 교체
  const onErrorImg = (e) => {
    // 더 이상의 onerror 이벤트 처리를 하지 않도록 설정
    e.target.onerror = null;
    // 대체 이미지로 변경
    e.target.src = process.env.REACT_APP_ERROR_IMG;
  };

  // 로고 로딩 실패 시 대체 이미지로 교체
  const onErrorLogo = (e) => {
    e.target.onerror = null;
    e.target.src = process.env.REACT_APP_ERROR_LOGO;
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
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(process.env.REACT_APP_WEB_HOME_URL);
    }
  };

  // 게시물 없을 시 뒤로가기
  const handleNoContent = () => {
    alert('게시글이 존재하지 않습니다.');
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(process.env.REACT_APP_WEB_HOME_URL);
    }
  };

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

  // 광고 로드
  const loadAd = (adUnitPath, adSizes, adSlotId) => {
    if (window.googletag && document.getElementById(adSlotId)) {
      window.googletag.cmd.push(function () {
        const existingSlot = window.googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === adSlotId);
        if (existingSlot) return;
        window.googletag.defineSlot(adUnitPath, adSizes, adSlotId).addService(window.googletag.pubads());
        window.googletag.display(adSlotId);
      });
    }
  };

  // URL 쿼리 파라미터 확인, Instagram 임베드 스크립트 로드
  useEffect(() => {
    // URL 쿼리 파라미터에서 f 값이 widget이면 isWidget을 true로 설정
    const params = new URLSearchParams(location.search);
    const f = params.get('f');
    if (f === 'widget') setIsWidget(true);

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // PWT 로드 후 광고 로드
  useEffect(() => {
    if (!isPWTLoaded) return;
    loadAd(
      '/284705699/Samsung_life/Samsung_life_anchor',
      [
        [320, 50],
        [320, 100],
      ],
      'div-gpt-ad-1573457886200-0',
    );
    loadAd(
      '/284705699/Samsung_life/Samsung_KR_life_viewer_below_image',
      [
        [320, 100],
        [320, 50],
      ],
      'div-gpt-ad-1613117154866-0',
    );
  }, [isPWTLoaded, location]);

  //광고 높이만큼 footer padding bottom 추가
  useEffect(() => {
    const adElement = document.getElementById('div-gpt-ad-1573457886200-0');
    if (!adElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const height = entries[0].contentRect.height;
      setAdHeight(height);
      // console.log('광고 높이:', height);

      if (height !== 0) {
        const footerElement = footerRef.current;
        if (!footerElement) return;
        footerElement.style.paddingBottom = `${height}px`;
      }
    });

    resizeObserver.observe(adElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isPWTLoaded]);

  // contentId가 변경될 때마다 실행
  useEffect(() => {
    saveHistory(contentId);
    updateViewCount(contentId);
  }, [contentId]);

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

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;
  if (data === '-6') return handleNoContent();
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
          {!isWidget && (
            <button type="button" aria-label="back_button" className={style.icon} onClick={handleBack}>
              <ArrowLeftIcon width={8} height={14} style={{ marginRight: '2px' }} />
            </button>
          )}
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

            {/* /284705699/Samsung_life/Samsung_KR_life_viewer_below_image */}
            <div className={adStyle.ad__below}>
              <div id="div-gpt-ad-1613117154866-0"></div>
            </div>

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
        {/* /284705699/Samsung_life/Samsung_life_anchor */}
        <div className={adStyle.ad__anchor}>
          <div id="div-gpt-ad-1573457886200-0"></div>
        </div>
      </footer>

      {moreOpen && <MoreMenu contents={data} />}
      {shareOpen && <ShareModal contents={data} onClose={handleShareMenu} />}
    </>
  );
};

export default Story;
