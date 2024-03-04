import { resaveLoaclStorage, clearLocalStorage } from 'utils/localStorage';

export const useHistory = (idx = null) => {
  const saveHistory = (idx) => {
    resaveLoaclStorage('history', idx);
  };

  const clearHistory = () => {
    clearLocalStorage('history');
  };

  return { saveHistory, clearHistory };
};
