import { useEffect, useRef } from 'react';
import { useAdContext } from 'context/AdContext';
import style from 'styles/Ad.module.css';

const AnchorAd = () => {
  const { isGPTLoaded, isVisible, setIsVisible, setAdHeight } = useAdContext();
  const adRef = useRef(null);

  useEffect(() => {
    if (!isGPTLoaded) return;

    const slotRenderEndedHandler = (event) => {
      if (event.slot === window.googletag.slot) {
        // 광고 표시
        setIsVisible(true);
      }
    };

    window.googletag.cmd.push(() => {
      const existingSlot = window.googletag
        .pubads()
        .getSlots()
        .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-1573457886200-0');

      if (!existingSlot) {
        // 광고 슬롯이 정의되지 않았을 경우에만 정의
        window.googletag.slot = window.googletag
          .defineSlot(
            '/284705699/Samsung_life/Samsung_life_anchor',
            [
              [320, 50],
              [320, 100],
            ],
            'div-gpt-ad-1573457886200-0',
          )
          .addService(window.googletag.pubads());
        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
      }

      // slotRenderEnded 이벤트 핸들러 등록
      window.googletag.pubads().addEventListener('slotRenderEnded', slotRenderEndedHandler);

      // 정의된 광고 슬롯에 대해 광고 요청
      window.googletag.display('div-gpt-ad-1573457886200-0');
    });

    return () => {
      if (window.googletag && window.googletag.pubads()) {
        window.googletag.pubads().removeEventListener('slotRenderEnded', slotRenderEndedHandler);
      }
    };
  }, [isGPTLoaded, isVisible, setIsVisible]);

  useEffect(() => {
    if (!isVisible || adRef.current?.className.includes(style.hide)) return;
    const height = adRef.current?.offsetHeight;
    setAdHeight(height);
  }, [isVisible, setAdHeight]);

  return (
    <div className={`${style.ad__anchor} ${isVisible ? '' : style.hide}`} ref={adRef}>
      <div id="div-gpt-ad-1573457886200-0"></div>
    </div>
  );
};

export default AnchorAd;