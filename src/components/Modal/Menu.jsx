import { useState } from 'react';
import cn from 'classnames';
import Modal from 'components/Modal/Modal';
import style from 'styles/Menu.module.css';
import { ReactComponent as CloseIcon } from 'assets/icon/Close.svg';
import { ReactComponent as LikeIcon } from 'assets/icon/LikeFilled.svg';
import { ReactComponent as ClockIcon } from 'assets/icon/Clock.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/icon/ArrowRight.svg';

function Menu({ onClose }) {
  const [showCategory, setShowCategory] = useState(false);
  const [showChannel, setShowChannel] = useState(false);
  const year = new Date().getFullYear();

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal>
      <div className={style.wrap}>
        <div className={style.header}>
          <h1>메뉴</h1>
          <button onClick={handleClose}>
            <CloseIcon width={16} height={16} fill={'black'} />
          </button>
        </div>
        <div className={style.menu}>
          <ul>
            <li className={style.menu__item}>
              <LikeIcon width={20} height={20} fill={'var(--color-blue)'} />
              <p>공감한 콘텐츠</p>
            </li>
            <li className={style.menu__item}>
              <ClockIcon width={20} height={20} fill={'var(--color-purple)'} />
              <p>최근 본 콘텐츠</p>
            </li>
          </ul>
          <div className={style.menu__drop}>
            <button className={style.menu__drop} onClick={() => setShowCategory(!showCategory)}>
              <p>카테고리</p>
              <ArrowRightIcon width={8} height={12} className={cn({ [style.active]: showCategory })} />
            </button>
            <ul className={cn(style.drop__menu, { [style.active]: showCategory })}>
              <li className={style.drop__item}>
                <figure>
                  <img src={`${process.env.REACT_APP_CATEGORY_ICON}all.svg`} alt="category icon" />
                </figure>
                <p>전체보기</p>
              </li>
            </ul>
          </div>
          <div className={style.menu__drop}>
            <button className={style.menu__drop} onClick={() => setShowChannel(!showChannel)}>
              <p>채널</p>
              <ArrowRightIcon width={8} height={12} className={cn({ [style.active]: showChannel })} />
            </button>
            <ul className={cn(style.drop__menu, { [style.active]: showChannel })}></ul>
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.footer__menu}>
            <span>개인정보처리방침</span>|<span>이용약관</span>
          </div>
          <p>Copyright ®{year} Weathernews Inc. All rights reserved</p>
        </div>
      </div>
    </Modal>
  );
}

export default Menu;
