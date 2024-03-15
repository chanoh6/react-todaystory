import { Outlet } from 'react-router-dom';
import { APIProvider } from 'context/APIContext';
import { ScrollToTop } from 'components';
import { styled } from 'styled-components';
import 'styles/App.css';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * @TODOS
 * 1. 라우터 설정
 * 2. APIProvider 설정
 * 3. ScrollToTop 설정
 * 4. Helmet 설정
 * 5. FontWrapper 설정
 * 6. context 설정 (메뉴 데이터)
 */

// FontWrapper를 사용하여 한국/글로벌/일본 별도 폰트를 적용
const FontWrapper = styled.div`
  font-family: ${process.env.REACT_APP_LOCALE_FONT}, sans-serif;
`;

function App() {
  const { t } = useTranslation();

  return (
    <>
      {/*  Helmet을 사용하여 메타태그를 동적으로 생성 */}
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
      {/* APIProvider를 사용하여 APIContext를 제공 */}
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
