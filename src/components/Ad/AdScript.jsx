import React, { useEffect } from 'react';

function AdScript() {
  useEffect(() => {
    // Pubmatic 스크립트 추가
    const pubmaticScript = document.createElement('script');
    const purl = window.location.href;
    let url = '//ads.pubmatic.com/AdServer/js/pwt/159369/2340';
    let profileVersionId = '';
    if (purl.indexOf('pwtv=') > 0) {
      const regexp = /pwtv=(.*?)(\&|$)/g;
      const matches = regexp.exec(purl);
      if (matches && matches.length >= 2 && matches[1].length > 0) {
        profileVersionId = '/' + matches[1];
      }
    }
    pubmaticScript.async = true;
    pubmaticScript.type = 'text/javascript';
    pubmaticScript.src = url + profileVersionId + '/pwt.js';
    document.head.appendChild(pubmaticScript);

    // Browsi 스크립트 추가
    const browsiScript = document.createElement('script');
    browsiScript.src = 'https://cdn.browsiprod.com/bootstrap/bootstrap.js';
    browsiScript.async = true;
    browsiScript.setAttribute('data-sitekey', 'weathernews');
    browsiScript.setAttribute('data-pubkey', 'weathernews');
    browsiScript.setAttribute('prebidbpt', 'true');
    browsiScript.id = 'browsi-tag';
    document.body.appendChild(browsiScript);

    const browsiInitScript = document.createElement('script');
    browsiInitScript.innerHTML = `
      window.browsitag = window.browsitag || {};   
      window.browsitag.cmd = window.browsitag.cmd || [];
    `;
    document.body.appendChild(browsiInitScript);

    // Amazon Ads 스크립트 추가
    const amazonScript = document.createElement('script');
    amazonScript.async = true;
    amazonScript.src = '//c.amazon-adsystem.com/aax2/apstag.js';
    document.head.appendChild(amazonScript);

    // Google Analytics & Tag Manager 설정
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-XXXXX');

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');

    return () => {
      document.head.removeChild(pubmaticScript);
      document.body.removeChild(browsiScript);
      document.head.removeChild(amazonScript);
      // Google Tag Manager or Analytics 스크립트를 제거하는 명확한 방법이 없기 때문에, 이 부분은 생략합니다.
      // 해당 스크립트들은 페이지 네비게이션이 일어날 때 자동으로 새 페이지 컨텍스트에 맞게 재로딩 됩니다.
    };
  }, []);

  return null;
}

export default AdScript;
