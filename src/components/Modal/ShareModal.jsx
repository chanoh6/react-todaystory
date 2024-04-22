import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import { decode } from 'html-entities';
import { KakaoIcon, FacebookIcon, TwitterIcon, LinkIcon, CloseIcon } from 'assets';
import style from 'styles/ShareModal.module.css';

const ShareModal = (props) => {
  const { contents, onClose } = props;
  const { t } = useTranslation();
  const URL = window.location.href;
  const shareRef = useRef();

  // 모달 닫기
  const handleCloseModal = (e) => {
    if (e.target === shareRef.current) {
      onClose();
    }
  };

  // twitter 공유
  const shareToTwitter = () => {
    const sharedLink = 'text=' + encodeURIComponent(decode(contents.title) + ' \n ') + encodeURIComponent(URL);
    window.open(`https://twitter.com/intent/tweet?${sharedLink}`);
  };

  // facebook 공유
  const shareToFacebook = () => {
    const sharedLink = encodeURIComponent(URL);
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${sharedLink}`);
  };

  // 카카오톡 공유
  // issue: 카카오톡 미설치 시 앱스토어로 이동하는 기능 추가 필요
  const shareToKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: `${contents.title}`,
        imageUrl: `${process.env.REACT_APP_THUMBNAIL_IMG_URL}${contents.thumbnail}`, // 공유할 이미지 URL
        link: {
          mobileWebUrl: window.location.href, // 모바일 웹 URL
          webUrl: window.location.href, // PC 웹 URL
        },
      },
    });

    const isKakaoAppInstalled = () => {
      return /KAKAOTALK/i.test(navigator.userAgent);
    };
  };

  /*
  const shareToKakao = () => {
    const isKakaoAppInstalled = () => {
      return /KAKAOTALK/i.test(navigator.userAgent);
    };
    
    const isIOS = () => {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    };
    
    if (isKakaoAppInstalled()) {
      // 카카오톡 앱이 설치되어 있으면 공유 기능 실행
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: `${decode(contents.title)}`,
          imageUrl: `https://local.picks.my/ko_v2/s/Thumbnail/${contents.thumbnail}`, // 공유할 이미지 URL
          link: {
            mobileWebUrl: window.location.href, // 모바일 웹 URL
            webUrl: window.location.href, // PC 웹 URL
          },
        },
      });
    } else {
      if (isIOS()) {
        window.location.href = 'https://apps.apple.com/kr/app/kakaotalk/id362057947';
      } else {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.kakao.talk&hl=ko&gl=US';
      }
    }
  };
  */

  // 링크 복사
  // issue: 링크 복사 검증 필요
  const shareToURL = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(URL);
        alert('링크가 복사되었습니다.');
      } catch (err) {
        shareToURLFallback(URL);
      }
    } else {
      shareToURLFallback(URL);
    }
  };

  // 링크 복사 fallback
  const shareToURLFallback = (text) => {
    let textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      let successful = document.execCommand('copy');
      alert(successful ? '링크가 복사되었습니다.' : '링크 복사에 실패했습니다.');
    } catch (err) {
      alert('링크 복사에 실패했습니다.');
    }
    document.body.removeChild(textArea);
  };

  // 카카오톡 SDK 초기화
  useEffect(() => {
    const script = document.createElement('script');
    // 카카오톡 SDK
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
    };
  }, []);

  return (
    <Modal>
      <div className={style.dim} ref={shareRef} onClick={handleCloseModal}>
        <button type="button" aria-label="close_button" className={style.icon} onClick={onClose}>
          <CloseIcon width={16} height={16} fill={'var(--color-white)'} />
        </button>
        <div className={style.sns__wrap}>
          <p className={style.title}>{t(`detail.share`)}</p>
          <ul>
            <li onClick={shareToKakao}>
              <img loading="lazy" src={KakaoIcon} alt="카카오" />
            </li>
            <li onClick={shareToFacebook}>
              <img loading="lazy" src={FacebookIcon} alt="페이스북" />
            </li>
            <li onClick={shareToTwitter}>
              <img loading="lazy" src={TwitterIcon} alt="트위터" />
            </li>
            <li onClick={shareToURL}>
              <img loading="lazy" src={LinkIcon} alt="URL" />
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
