import { useState } from 'react';

export const useMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClickMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return { showMenu, handleClickMenu, handleCloseMenu };
};
