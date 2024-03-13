import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import style from 'styles/ShareModal.module.css';
import { CloseIcon } from 'assets';
import kakao from '../../assets/icon/Kakao.png';
import Facebook from '../../assets/icon/Facebook.png';
import Twitter from '../../assets/icon/Twitter.png';
import Link from '../../assets/icon/Link.png';

const ShareModal = (props) => {
  const { contents, onClose } = props;
  const url = `https://local.todaystory.me/view/${contents.idx}`;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js'; // 카카오톡 SDK
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      // 카카오 SDK 초기화
      window.Kakao.init('c6c00201cb6e95082b0ec1a6c4a531c6');
    };
  }, []);

  const shareToTwitter = () => {
    const sharedLink = 'text=' + encodeURIComponent(contents.title + ' \n ') + encodeURIComponent(url);
    window.open(`https://twitter.com/intent/tweet?${sharedLink}`);
  };

  const shareToFacebook = () => {
    const sharedLink = encodeURIComponent(url);
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${sharedLink}`);
  };

  const shareToURL = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('url을 복사했습니다.', url);
    });
  };

  const shareToKakao = () => {
    // 카카오 링크 공유하기
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: `${contents.title}`,
        imageUrl: `https://local.todaystory.me/ko/s/Thumbnail/${contents.thumbnail}`, // 공유할 이미지 URL
        link: {
          mobileWebUrl: window.location.href, // 모바일 웹 URL
          webUrl: window.location.href, // PC 웹 URL
        },
      },
    });
  };

  return (
    <Modal>
      <div className={style.dim}>
        <button className={style.icon} onClick={onClose}>
          <CloseIcon width={15} height={15} fill={'#fff'} />
        </button>
        <div className={style.sns__wrap}>
          <p className={style.title}>
            TodayStory의 콘텐츠를
            <br /> SNS에 공유해보세요.
          </p>
          <ul>
            <li onClick={shareToKakao}>
              <img loading="lazy" src={kakao} alt="카카오" />
            </li>
            <li onClick={shareToFacebook}>
              <img loading="lazy" src={Facebook} alt="페이스북" />
            </li>
            <li onClick={shareToTwitter}>
              <img loading="lazy" src={Twitter} alt="트위터" />
            </li>
            <li onClick={shareToURL}>
              <img loading="lazy" src={Link} alt="URL" />
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
