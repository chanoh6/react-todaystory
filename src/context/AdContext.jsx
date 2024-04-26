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
  const [isPWTLoaded, setIsPWTLoaded] = useState(false);
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
        gtag('send', 'pageview');
        // gtag('event', 'page_view');
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

    // Geo Edge 태그
    addScript('//rumcdn.geoedge.be/275f7111-2d04-458d-b278-d92922841cd7/grumi-ip.js', true, null, 'geoedge-script');

    // 페이지 언마운트 시 스크립트 제거
    return () => {
      removeScript('pubmatic-script');
      removeScript('amazon-script');
      removeScript('ga4-script');
      removeScript('ua-script');
      removeScript('geoedge-script');
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
          const slots = window.googletag.pubads().getSlots();
          slots.forEach((slot) => window.googletag.pubads().refresh([slot]));
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
        const slots = window.googletag.pubads().getSlots();
        if (slots && slots.length > 0) {
          window.PWT.requestBids(
            window.PWT.generateConfForGPT(window.googletag.pubads().getSlots()),
            (adUnitsArray) => {
              window.PWT.addKeyValuePairsToGPTSlots(adUnitsArray);
              if (window.googletag.pubadsReady && !isPWTLoaded) {
                window.googletag.pubads().refresh();
              }
              setIsPWTLoaded(true);
            },
          );
          clearInterval(checkPWTAndGPT);
        }
      }
    }, 100);

    return () => {
      setIsVisible(false);
      setIsGPTLoaded(false);
      setIsPWTLoaded(false);
      removeScript('gpt-script');
    };
  }, [location]);

  return (
    <AdContext.Provider value={{ isGPTLoaded, isPWTLoaded, isVisible, setIsVisible, adHeight, setAdHeight }}>
      {children}
    </AdContext.Provider>
  );
};
