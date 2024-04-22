import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import useFetchData from 'hooks/useFetchData';
import { decode } from 'html-entities';
import Modal from 'components/Modal/Modal';
import { CloseIcon, LikeFilledIcon, ArrowRightIcon, HistoryIcon } from 'assets';
import style from 'styles/Menu.module.css';

const Menu = (props) => {
  const year = new Date().getFullYear();
  const { onClose } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const [showCategory, setShowCategory] = useState(false);
  const [showChannel, setShowChannel] = useState(false);
  const menuRef = useRef();
  // 카테고리 데이터
  const { data: categoryList } = useFetchData(() => api.category(), 'category');
  // 채널 데이터
  const { data: channelList } = useFetchData(() => api.channel(), 'channel');

  // 아이콘 로딩 실패 시 대체 이미지로 교체
  const onErrorIcon = (e) => {
    e.target.onerror = null;
    e.target.src = process.env.REACT_APP_ERROR_ICON;
  };

  // 로고 로딩 실패 시 대체 이미지로 교체
  const onErrorLogo = (e) => {
    e.target.onerror = null;
    e.target.src = process.env.REACT_APP_ERROR_LOGO;
  };

  // 메뉴 닫기
  const handleClose = () => {
    onClose?.();
  };

  // 페이지 이동 시 메뉴 닫기
  // issue: setTimeout은 좋지 않음. menu 상태를 전역으로 관리하기
  const handleNavigate = (url, title = '') => {
    navigate(url, {
      state: { title },
    });
    setTimeout(() => {
      handleClose();
    }, 100);
  };

  /*
  const { isMenuOpen } = props;
  useEffect(() => {
    // 다닫히는 액션
  }, [isMenuOpen]); 
  */

  // vh 단위 계산
  const setScreenSize = () => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // 화면 크기 변경 시 vh 단위 계산
  useEffect(() => {
    setScreenSize();

    window.addEventListener('resize', setScreenSize);
    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  // 메뉴 높이 계산
  useEffect(() => {
    const menuHeight = menuRef.current.offsetHeight;
    menuRef.current.style.setProperty('height', `${menuHeight}px`);
  }, [showCategory, showChannel]);

  return (
    <Modal>
      <div className={style.wrap} ref={menuRef}>
        <div className={style.header}>
          <h1>{t(`menu.title`)}</h1>
          <button type="button" aria-label="close_button" onClick={handleClose}>
            <CloseIcon width={16} height={16} fill={'var(--color-black)'} />
          </button>
        </div>

        <div className={style.menu}>
          <ul>
            <li className={style.menu__item} onClick={() => handleNavigate(process.env.REACT_APP_WEB_FAVORITE_URL)}>
              <LikeFilledIcon width={20} height={18} fill={'var(--color-blue)'} />
              <p>{t(`menu.favorites`)}</p>
            </li>
            <li className={style.menu__item} onClick={() => handleNavigate(process.env.REACT_APP_WEB_HISTORY_URL)}>
              <HistoryIcon width={20} height={18} fill={'var(--color-purple)'} />
              <p>{t(`menu.history`)}</p>
            </li>
          </ul>

          <div className={style.menu__drop}>
            <button type="button" aria-label="more_button" onClick={() => setShowCategory(!showCategory)}>
              <p>{t(`menu.category`)}</p>
              <ArrowRightIcon width={7} height={12} className={showCategory ? style.active : ''} />
            </button>

            <ul className={`${style.drop__list} ${showCategory ? style.active : ''}`}>
              <li className={style.drop__item} onClick={() => handleNavigate(process.env.REACT_APP_WEB_HOME_URL)}>
                <figure>
                  <img
                    loading="lazy"
                    src={`${process.env.REACT_APP_CATEGORY_ICON}all.svg`}
                    alt="category icon"
                    onError={onErrorIcon}
                  />
                </figure>
                <p>{t(`nav.all`)}</p>
              </li>

              {categoryList &&
                categoryList.map((cate) => (
                  <li
                    className={style.drop__item}
                    key={cate.idx}
                    onClick={() =>
                      handleNavigate(`${process.env.REACT_APP_WEB_CATEGORY_URL}${cate.idx}`, decode(cate.name))
                    }
                  >
                    <figure>
                      <img
                        loading="lazy"
                        src={`${process.env.REACT_APP_CATEGORY_ICON}${cate.icon}`}
                        alt="category icon"
                      />
                    </figure>
                    <p>{decode(cate.name)}</p>
                  </li>
                ))}
            </ul>
          </div>

          <div className={style.menu__drop}>
            <button type="button" aria-label="more_button" onClick={() => setShowChannel(!showChannel)}>
              <p>{t(`menu.channel`)}</p>
              <ArrowRightIcon width={7} height={12} className={showChannel ? style.active : ''} />
            </button>

            <ul className={`${style.drop__list} ${showChannel ? style.active : ''}`}>
              {channelList &&
                channelList.map((ch) => (
                  <li
                    className={`${style.drop__item} ${style.channel}`}
                    key={ch.idx}
                    onClick={() => handleNavigate(`${process.env.REACT_APP_WEB_CHANNEL_URL}${ch.idx}`, decode(ch.name))}
                  >
                    <figure>
                      <img
                        loading="lazy"
                        src={`${process.env.REACT_APP_LOGO_IMG_URL}${ch.logo}`}
                        alt="channel icon"
                        onError={onErrorLogo}
                      />
                    </figure>
                    <p>{decode(ch.name)}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.footer__menu}>
            <span onClick={() => handleNavigate(process.env.REACT_APP_WEB_PRIVACY_URL)}>{t(`menu.privacy`)}</span>
            <span onClick={() => handleNavigate(process.env.REACT_APP_WEB_SERVICE_URL)}>{t(`menu.service`)}</span>
            {process.env.REACT_APP_LOCALE === 'en' ? (
              <>
                <span onClick={() => handleNavigate(process.env.REACT_APP_WEB_PRIVACY_URL)}>CookieList</span>
                <span onClick={() => handleNavigate(process.env.REACT_APP_WEB_SERVICE_URL)}>
                  Do not sell my personal information
                </span>
              </>
            ) : (
              <></>
            )}
          </div>
          <p>{t(`menu.copyright`, { year })}</p>
        </div>
      </div>
    </Modal>
  );
};

export default Menu;
