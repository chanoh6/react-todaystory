import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import style from 'styles/ShareModal.module.css';
import { CloseIcon } from 'assets';
import kakao from '../../assets/icon/Kakao.png';
import Facebook from '../../assets/icon/Facebook.png';
import Twitter from '../../assets/icon/Twitter.png';
import Link from '../../assets/icon/Link.png';

function ShareModal({ contents, props }) {
  const [shareOpen, setShareOpen] = useState(false);

  const url = `https://local.todaystory.me/view/${contents.idx}`;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js'; // 카카오톡 SDK
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // return으로 제거해주기
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

  const closeBtn = () => {
    setShareOpen(!shareOpen);
  };

  return (
    <Modal>
      <div className={style.dimm}>
        <button className={style.icon} onClick={closeBtn}>
          <CloseIcon width={15} height={15} fill={'#fff'} />
        </button>
        <div className={style.sns__wrap}>
          <p className={style.title}>
            TodayStory의 콘텐츠를
            <br /> SNS에 공유해보세요.
          </p>
          <ul>
            <li>
              <img src={kakao} alt="카카오" />
            </li>
            <li onClick={shareToFacebook}>
              <img src={Facebook} alt="페이스북" />
            </li>
            <li onClick={shareToTwitter}>
              <img src={Twitter} alt="트위터" />
            </li>
            <li onClick={shareToURL}>
              <img src={Link} alt="URL" />
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}

export default ShareModal;
