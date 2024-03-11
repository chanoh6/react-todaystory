import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategory, useChannel } from 'hooks/useStories';
import { CloseIcon, LikeFilledIcon, ArrowRightIcon, HistoryIcon } from 'assets';
import cn from 'classnames';
import Modal from 'components/Modal/Modal';
import style from 'styles/Menu.module.css';

function Menu({ onClose }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showCategory, setShowCategory] = useState(false);
  const [showChannel, setShowChannel] = useState(false);
  const { data: categoryList } = useCategory();
  const { data: channelList } = useChannel();
  const year = new Date().getFullYear();

  const handleClose = () => {
    onClose?.();
  };

  const handleNavigate = (url) => {
    navigate(url);
    setTimeout(() => {
      handleClose();
    }, 100);
  }

  return (
    <Modal>
      <div className={style.wrap}>
        <div className={style.header}>
          <h1>{t(`menu.title`)}</h1>
          <button onClick={handleClose}>
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
            <button onClick={() => setShowCategory(!showCategory)}>
              <p>{t(`menu.category`)}</p>
              <ArrowRightIcon width={7} height={12} className={cn({ [style.active]: showCategory })} />
            </button>

            <ul className={cn(style.drop__list, { [style.active]: showCategory })}>
              <li className={style.drop__item} onClick={() => handleNavigate(process.env.REACT_APP_WEB_HOME_URL)}>
                <figure>
                  <img src={`${process.env.REACT_APP_CATEGORY_ICON}all.svg`} alt="category icon" />
                </figure>
                <p>{t(`nav.all`)}</p>
              </li>

              {categoryList.map((cate) => (
                <li className={style.drop__item} key={cate.idx} onClick={() => handleNavigate(`${process.env.REACT_APP_WEB_CATEGORY_URL}${cate.idx}`)}>
                  <figure>
                    <img src={`${process.env.REACT_APP_CATEGORY_ICON}${cate.icon}`} alt="category icon" />
                  </figure>
                  <p>{cate.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={style.menu__drop}>
            <button onClick={() => setShowChannel(!showChannel)}>
              <p>{t(`menu.channel`)}</p>
              <ArrowRightIcon width={7} height={12} className={cn({ [style.active]: showChannel })} />
            </button>

            <ul className={cn(style.drop__list, { [style.active]: showChannel })}>
              {channelList.map((ch) => (
                <li className={cn(style.drop__item, style.channel)} key={ch.idx} onClick={() => handleNavigate(`${process.env.REACT_APP_WEB_CHANNEL_URL}${ch.idx}`)}>
                  <figure>
                    <img src={`${process.env.REACT_APP_BASE_IMG_URL}cp/${ch.logo}`} alt="channel icon" />
                  </figure>
                  <p>{ch.name}</p>
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
}

export default Menu;
