import { useEffect } from 'react';

const AmazonAds = () => {
  useEffect(() => {
    const adsScript = document.createElement('script');
    adsScript.async = true;
    adsScript.src = '//c.amazon-adsystem.com/aax2/apstag.js';
    document.head.appendChild(adsScript);

    // Additional Amazon Ads setup can go here
  }, []);

  return null;
};

export default AmazonAds;
