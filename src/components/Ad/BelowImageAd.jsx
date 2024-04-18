import { useEffect, useRef } from 'react';
import { useAdContext } from 'context/AdContext';
import style from 'styles/Ad.module.css';

const BelowImageAd = () => {
  const { isGPTLoaded, isVisible, setIsVisible } = useAdContext();

  useEffect(() => {
    if (!isGPTLoaded) return;

    const slotRenderEndedHandler = (event) => {
      if (event.slot === window.googletag.slot) {
        // 광고 표시
        setIsVisible(true);
      }
    };

    window.googletag.cmd.push(() => {
      if (!window.googletag.slot) {
        // 광고 슬롯이 정의되지 않았을 경우에만 정의
        window.googletag.slot = window.googletag
          .defineSlot(
            '/284705699/Samsung_life/Samsung_KR_life_viewer_below_image',
            [
              [320, 100],
              [320, 50],
            ],
            'div-gpt-ad-1613117154866-0',
          )
          .addService(window.googletag.pubads());
        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
      }

      // slotRenderEnded 이벤트 핸들러 등록
      window.googletag.pubads().addEventListener('slotRenderEnded', slotRenderEndedHandler);

      // 정의된 광고 슬롯에 대해 광고 요청
      window.googletag.display('div-gpt-ad-1613117154866-0');
    });

    return () => {
      if (window.googletag && window.googletag.pubads()) {
        window.googletag.pubads().removeEventListener('slotRenderEnded', slotRenderEndedHandler);
      }
    };
  }, [isGPTLoaded, isVisible, setIsVisible]);

  return (
    <div className={`${style.ad__anchor} ${isVisible ? '' : style.hide}`}>
      <div id="div-gpt-ad-1613117154866-0"></div>
    </div>
  );
};

export default BelowImageAd;
