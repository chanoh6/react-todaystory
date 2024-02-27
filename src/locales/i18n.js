import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from 'locales/en-US/translation.json';
import ko from 'locales/ko-KR/translation.json';
import ja from 'locales/ja-JP/translation.json';

const date = new Date();

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
  ja: {
    translation: ja,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ja', // 기본 설정 언어, 'cimode'로 설정할 경우 키 값으로 출력된다.
  fallbackLng: 'en', // 번역 파일에서 찾을 수 없는 경우 기본 언어
  interpolation: {
    escapeValue: false, // 동적인 데이터 값 할당 설정
  },
});

export default i18n;
