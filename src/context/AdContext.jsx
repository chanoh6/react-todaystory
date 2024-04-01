import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AdContext = createContext();

export const useAdContext = () => useContext(AdContext);

export const AdProvider = ({ children }) => {
  const location = useLocation();
  const [isGPTLoaded, setIsGPTLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // 페이지 변경 감지
  const [adHeight, setAdHeight] = useState(0);

  useEffect(() => {
    // GPT 라이브러리 로드 확인 및 초기화
    const checkAndLoadGPT = () => {
      if (window.googletag && window.googletag.apiReady) {
        // GPT 라이브러리가 이미 로드되어 있으면 상태를 업데이트하지 않음
        setIsGPTLoaded(true);
        window.googletag.cmd.push(() => {
          window.googletag.pubads().refresh();
        });
        return;
      }

      //GPT 스크립트 로드
      const gptScript = document.createElement('script');
      gptScript.async = true;
      gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
      gptScript.onload = () => {
        window.googletag = window.googletag || { cmd: [] };
        window.googletag.cmd.push(() => {
          // 스크립트 로드 완료 후 상태 업데이트
          setIsGPTLoaded(true);
        });
      };
      document.head.appendChild(gptScript);
    };

    checkAndLoadGPT();

    return () => {
      setIsVisible(false);
    };
  }, [location]);

  return (
    <AdContext.Provider value={{ isGPTLoaded, isVisible, setIsVisible, adHeight, setAdHeight }}>
      {children}
    </AdContext.Provider>
  );
};
