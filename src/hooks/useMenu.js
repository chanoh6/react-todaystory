import { useState } from 'react';

export const useMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const clickMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return { showMenu, clickMenu, closeMenu };
};
