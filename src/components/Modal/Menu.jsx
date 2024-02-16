import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloseIcon, LikeFilledIcon, ClockIcon, ArrowRightIcon } from 'assets';
import cn from 'classnames';
import Modal from 'components/Modal/Modal';
import style from 'styles/Menu.module.css';

function Menu({ onClose }) {
  const { t } = useTranslation();
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
          <h1>{t(`menu.title`)}</h1>
          <button onClick={handleClose}>
            <CloseIcon width={16} height={16} fill={'black'} />
          </button>
        </div>
        <div className={style.menu}>
          <ul>
            <li className={style.menu__item}>
              <LikeFilledIcon width={18} height={18} fill={'var(--color-blue)'} />
              <p>{t(`menu.favorites`)}</p>
            </li>
            <li className={style.menu__item}>
              <ClockIcon width={18} height={18} fill={'var(--color-purple)'} />
              <p>{t(`menu.history`)}</p>
            </li>
          </ul>
          <div className={style.menu__drop}>
            <button onClick={() => setShowCategory(!showCategory)}>
              <p>{t(`menu.category`)}</p>
              <ArrowRightIcon width={8} height={12} className={cn({ [style.active]: showCategory })} />
            </button>
            <ul className={cn(style.drop__list, { [style.active]: showCategory })}>
              <li className={style.drop__item}>
                <figure>
                  <img src={`${process.env.REACT_APP_CATEGORY_ICON}all.svg`} alt="category icon" />
                </figure>
                <p>{t(`nav.all`)}</p>
              </li>
            </ul>
          </div>
          <div className={style.menu__drop}>
            <button onClick={() => setShowChannel(!showChannel)}>
              <p>{t(`menu.channel`)}</p>
              <ArrowRightIcon width={8} height={12} className={cn({ [style.active]: showChannel })} />
            </button>
            <ul className={cn(style.drop__list, { [style.active]: showChannel })}></ul>
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.footer__menu}>
            <span>{t(`menu.privacy`)}</span>|<span>{t(`menu.terms`)}</span>
          </div>
          <p>{t(`menu.copyright`, { year })}</p>
        </div>
      </div>
    </Modal>
  );
}

export default Menu;