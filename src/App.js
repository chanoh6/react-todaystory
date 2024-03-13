import { Outlet } from 'react-router-dom';
import { APIProvider } from 'context/APIContext';
import { ScrollToTop } from 'components';
import { styled } from 'styled-components';
import 'styles/App.css';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// 한국/글로벌/일본 별도 폰트 적용
const FontWrapper = styled.div`
  font-family: ${process.env.REACT_APP_LOCALE_FONT}, sans-serif;
`;

function App() {
  const { t } = useTranslation();

  return (
    <>
      {/* meta 태그 클라이언트 사이드에서 동적 생성 */}
      <Helmet>
        <noscript>{t(`meta.noscript`)}</noscript>

        <title>{t(`meta.title`)}</title>
        <meta name="description" content={t(`meta.description`)} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={t(`meta.title`)} />
        <meta property="og:title" content={t(`meta.title`)} />
        <meta property="og:description" content={t(`meta.description`)} />
        <meta property="og:image" content="/assets/todaystory.png" />
        <meta property="og:url" content={process.env.REACT_APP_WEB_BASE_URL} />

        <meta name="twitter:title" content={t(`meta.title`)} />
        <meta name="twitter:description" content={t(`meta.description`)} />
        <meta name="twitter:image" content="/assets/todaystory.png" />
        <meta name="twitter:card" content={t(`meta.description`)} />
      </Helmet>
      <APIProvider>
        <FontWrapper>
          <ScrollToTop />
          <Outlet />
        </FontWrapper>
      </APIProvider>
    </>
  );
}
export default App;
