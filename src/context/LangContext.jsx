import { createContext } from 'react';

export const LangContext = createContext();

const LangProvider = ({ children }) => {
  // state 초기화
  const initialState = 'ko';
  const [lang, setLang] = useState('initialState');

  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
};

export default LangProvider;
