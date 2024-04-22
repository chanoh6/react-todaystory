import React, { useState } from 'react';
import { Menu } from 'components';
import { MenuIcon } from 'assets';
import style from 'styles/Home.module.css';

const MenuButton = () => {
  const [showMenu, setShowMenu] = useState(false);

  // 메뉴 버튼 클릭
  const handleClickMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // 메뉴 닫기
  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <button type="button" aria-label="menu_button" className={style.icon} onClick={handleClickMenu}>
        <MenuIcon width={20} height={20} fill={'var(--color-black)'} />
      </button>
      {showMenu && <Menu onClose={handleCloseMenu} />}
    </>
  );
};

export default MenuButton;
