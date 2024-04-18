import React, { useEffect, useRef } from 'react';
import { useAdContext } from 'context/AdContext';
import style from 'styles/Ad.module.css';

const GenericAd = ({ adSlotId, adSizes, adUnitPath, adStyle }) => {
  const { isGPTLoaded, isVisible, setIsVisible, setAdHeight } = useAdContext();
  const adRef = useRef(null);
  const adSlotRef = useRef(null); // 광고 슬롯을 저장할 ref

  useEffect(() => {
    // GPT 스크립트 로드 전이면 실행하지 않음
    if (!isGPTLoaded) return;

    const slotRenderEndedHandler = (event) => {
      if (event.slot === adSlotRef.current) {
        // 광고 표시
        setIsVisible(true);
      }
    };

    window.googletag.cmd.push(() => {
      const existingSlot = window.googletag
        .pubads()
        .getSlots()
        .find((slot) => slot.getSlotElementId() === adSlotId);

      if (existingSlot) return;

      if (!existingSlot) {
        // 광고 슬롯이 정의되지 않았을 경우에만 정의
        adSlotRef.current = window.googletag
          .defineSlot(adUnitPath, adSizes, adSlotId)
          .addService(window.googletag.pubads());
        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
      } else {
        adSlotRef.current = existingSlot; // 기존 슬롯 재사용
      }

      // slotRenderEnded 이벤트 핸들러 등록
      window.googletag.pubads().addEventListener('slotRenderEnded', slotRenderEndedHandler);

      // 정의된 광고 슬롯에 대해 광고 요청
      window.googletag.display(adSlotId);
    });

    return () => {
      if (window.googletag && window.googletag.pubads()) {
        window.googletag.pubads().removeEventListener('slotRenderEnded', slotRenderEndedHandler);
        // if (!adSlotRef.current) return;
        window.googletag.pubads().clear();
      }
    };
  }, [isGPTLoaded, isVisible, setIsVisible, adUnitPath, adSizes, adSlotId]);

  useEffect(() => {
    if (!isVisible || adRef.current?.className.includes(style.hide) || adSlotId !== 'div-gpt-ad-1573457886200-0')
      return;
    const height = adRef.current?.offsetHeight;
    setAdHeight(height);
  }, [isVisible, setAdHeight]);

  return (
    <div className={`${adStyle} ${isVisible ? '' : style.hide}`} ref={adRef}>
      <div id={adSlotId}></div>
    </div>
  );
};

export default GenericAd;
