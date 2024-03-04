import { useAPI } from 'context/APIContext_';
import { useState } from 'react';

export const useMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const clickMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return { showMenu, clickMenu };
};

export const useCategory = () => {
  const { api } = useAPI();
};
