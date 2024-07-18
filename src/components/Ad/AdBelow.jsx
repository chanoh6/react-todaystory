import React, { useEffect, useState } from 'react';
import { useAdContext } from 'context/AdContext';
import adStyle from 'styles/Ad.module.css';

const AdBelow = React.memo(({ index }) => {
  const { isGPTLoaded } = useAdContext();
  const [adSlotId, setAdSlotId] = useState('');
  const [adUnitPath, setAdUnitPath] = useState('');
  const [adSizes, setAdSizes] = useState('');

  // 광고 로드
  const loadAd = (adUnitPath, adSizes, adSlotId) => {
    if (window.googletag && document.getElementById(adSlotId)) {
      window.googletag.cmd.push(function () {
        // 이미 로드된 광고 슬롯이 있는지 확인
        const existingSlot = window.googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === adSlotId);
        // 이미 로드된 광고 슬롯이 있으면 해당 슬롯만 리프레시
        if (existingSlot) {
          window.googletag.pubads().refresh([existingSlot]);
          return;
        }
        // 광고 슬롯 정의 및 로드
        window.googletag.defineSlot(adUnitPath, adSizes, adSlotId).addService(window.googletag.pubads());
        window.googletag.display(adSlotId);
      });
    }
  };

  // 광고 슬롯 ID, 유닛 경로, 사이즈 설정
  useEffect(() => {
    setAdSlotId(`div-gpt-ad-1613117154866-0`);
    setAdUnitPath(`/284705699/Samsung_life/Samsung_KR_life_viewer_below_image`);
    setAdSizes([
      [320, 50],
      [320, 100],
    ]);
  }, [isGPTLoaded]);

  // 광고 슬롯 ID, 유닛 경로, 사이즈 변경시 광고 로드
  useEffect(() => {
    loadAd(adUnitPath, adSizes, adSlotId);
  }, [adSlotId, adUnitPath, adSlotId]);

  return <div id={adSlotId} className={adStyle.ad__home}></div>;
});

export default AdBelow;
