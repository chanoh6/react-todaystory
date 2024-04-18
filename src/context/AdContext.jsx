import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AdContext = createContext();

export const useAdContext = () => useContext(AdContext);

// 스크립트 로드를 위한 헬퍼 함수
const addScript = (src, async = true, callback = () => {}, id = '') => {
  if (!document.querySelector(`script[id="${id}"]`)) {
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = async;
    script.onload = callback;
    document.head.appendChild(script);
  }
};

// 스크립트 제거를 위한 헬퍼 함수
const removeScript = (id) => {
  const script = document.getElementById(id);
  if (script) {
    document.head.removeChild(script);
  }
};

export const AdProvider = ({ children }) => {
  const location = useLocation();
  const [isGPTLoaded, setIsGPTLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // 페이지 변경 감지
  const [adHeight, setAdHeight] = useState(0);

  useEffect(() => {
    // Pubmatic 스크립트 추가
    const purl = window.location.href;
    let url = '//ads.pubmatic.com/AdServer/js/pwt/159369/2845';
    let profileVersionId = '';

    if (purl.indexOf('pwtv=') > 0) {
      const regexp = /pwtv=(.*?)(\&|$)/g;
      const matches = regexp.exec(purl);
      if (matches && matches.length >= 2 && matches[1].length > 0) {
        profileVersionId = '/' + matches[1];
      }
    }

    addScript(url + profileVersionId + '/pwt.js', true, null, 'pubmatic-script');

    // Amazon Ads 스크립트 추가
    addScript('//c.amazon-adsystem.com/aax2/apstag.js', true, null, 'amazon-script');

    // GA4 스크립트 추가
    addScript(
      'https://www.googletagmanager.com/gtag/js?id=G-3GEGY1QV1W',
      true,
      () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-3GEGY1QV1W');
        gtag('event', 'page_view');
      },
      'ga4-script',
    );

    // google analytics 스크립트 추가
    addScript(
      'https://www.google-analytics.com/analytics.js',
      true,
      () => {
        window.GoogleAnalyticsObject = 'ga';
        window.ga =
          window.ga ||
          function () {
            (window.ga.q = window.ga.q || []).push(arguments);
          };
        window.ga.l = +new Date();
        window.ga('create', 'UA-103147671-3', 'auto');
        window.ga('send', 'pageview');
      },
      'ua-script',
    );

    // 페이지 언마운트 시 스크립트 제거
    return () => {
      removeScript('pubmatic-script');
      removeScript('amazon-script');
      removeScript('ga4-script');
      removeScript('ua-script');
    };
  }, []);

  useEffect(() => {
    // GPT 스크립트 로드 및 초기화
    const loadGPT = () => {
      if (!window.googletag || !window.googletag.apiReady) {
        addScript(
          'https://securepubads.g.doubleclick.net/tag/js/gpt.js',
          true,
          () => {
            window.googletag = window.googletag || { cmd: [] };
            window.googletag.cmd.push(() => {
              window.googletag
                .defineSlot(
                  '/284705699/Samsung_life/Samsung_life_anchor',
                  [
                    [320, 50],
                    [320, 100],
                  ],
                  'div-gpt-ad-1573457886200-0',
                )
                .addService(window.googletag.pubads());

              window.googletag
                .defineSlot(
                  '/284705699/Samsung_life/Samsung_KR_life_list_atf',
                  [
                    [320, 100],
                    [320, 50],
                  ],
                  'div-gpt-ad-1613117118357-0',
                )
                .addService(window.googletag.pubads());

              window.googletag
                .defineSlot(
                  '/284705699/Samsung_life/Samsung_KR_life_list_between_top_list',
                  [[200, 200], [320, 100], [320, 180], [320, 50], [336, 280], [300, 250], 'fluid'],
                  'div-gpt-ad-1628051169428-0',
                )
                .addService(window.googletag.pubads());

              if (!window.googletag.pubads().getTargetingKeys().includes('singleRequest')) {
                window.googletag.pubads().enableSingleRequest();
              }
              window.googletag.enableServices();
              setIsGPTLoaded(true);
            });
          },
          'gpt-script',
        );
      } else {
        setIsGPTLoaded(true);
        window.googletag.cmd.push(() => {
          window.googletag.pubads().refresh();
        });
      }
    };

    loadGPT(); // 함수 호출

    // PWT 스크립트 로드 확인 및 초기화
    const checkPWTAndGPT = setInterval(() => {
      if (
        window.googletag &&
        window.googletag.apiReady &&
        typeof window.PWT !== 'undefined' &&
        typeof window.PWT.addKeyValuePairsToGPTSlots === 'function'
      ) {
        window.PWT.requestBids(window.PWT.generateConfForGPT(window.googletag.pubads().getSlots()), (adUnitsArray) => {
          window.PWT.addKeyValuePairsToGPTSlots(adUnitsArray);
          if (window.googletag.pubadsReady) {
            window.googletag.pubads().refresh();
          }
        });
        clearInterval(checkPWTAndGPT);
      }
    }, 100);

    return () => {
      setIsVisible(false);
      removeScript('gpt-script');
    };
  }, [location]);

  return (
    <AdContext.Provider value={{ isGPTLoaded, isVisible, setIsVisible, adHeight, setAdHeight }}>
      {children}
    </AdContext.Provider>
  );
};
