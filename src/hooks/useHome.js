import { useNavigate } from 'react-router-dom';

export const useHome = () => {
  const navigate = useNavigate();

  const clickLogo = () => navigate('/');

  const clickFortune = () => window.open('http://s.sazoo.com/fortune/tarot.html');

  return { clickLogo, clickFortune };
};
