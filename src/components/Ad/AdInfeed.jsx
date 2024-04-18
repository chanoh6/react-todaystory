import { useAdContext } from 'context/AdContext';
import React, { useEffect, useState } from 'react';
import adStyle from 'styles/Ad.module.css';

const AdInfeed = React.memo(({ index }) => {
  const { isGPTLoaded } = useAdContext();
  const [adSlotId, setAdSlotId] = useState('');
  const [adUnitPath, setAdUnitPath] = useState('');
  const [adSizes, setAdSizes] = useState('');

  // 광고 로드
  const loadAd = (adUnitPath, adSizes, adSlotId) => {
    if (window.googletag && document.getElementById(adSlotId)) {
      window.googletag.cmd.push(function() {
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

  useEffect(() => {
    const adNum = (index % 3 - 1) >= 0 ? index % 3 - 1 : 2;
    const adInfeed = [
      'div-gpt-ad-1623978560284',
      'div-gpt-ad-1623978689578',
      'div-gpt-ad-1623978827138'
    ];
    
    setAdSlotId(`${adInfeed[adNum]}-${index}`);
    setAdUnitPath(`/284705699/Samsung_life/Samsung_KR_life_categorylist_infeed${adNum + 1}`);
    setAdSizes([[320, 100], 'fluid']);
  }, [index, isGPTLoaded]);
  
  useEffect(() => {
    loadAd(adUnitPath, adSizes, adSlotId);
  }, [adSlotId, adUnitPath, adSlotId]);

  return <div id={adSlotId} className={adStyle.ad__home}></div>;
});

export default AdInfeed;
