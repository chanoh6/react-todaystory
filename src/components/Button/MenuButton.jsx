import { useState } from 'react';
import { Menu } from 'components';
import { MenuIcon } from 'assets';
import style from 'styles/Home.module.css';

const MenuButton = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClickMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <button className={style.icon} onClick={handleClickMenu}>
        <MenuIcon width={20} height={20} fill={'var(--color-black)'} />
      </button>
      {showMenu && <Menu onClose={handleCloseMenu} />}
    </>
  );
};

export default MenuButton;
