import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { APIProvider } from 'context/APIContext';
import { APIProvider2 } from 'context/APIContextTest';
import { AdProvider } from 'context/AdContext';
import { styled } from 'styled-components';
import { ScrollToTop } from 'components';
import 'styles/App.css';

/**
 * @TODOS
 * - 전역 상태 관리 추가 (메뉴, 테마)
 */

const queryClient = new QueryClient();

// FontWrapper: 언어별 폰트 설정
const FontWrapper = styled.div`
  font-family: ${(props) => (props.lang === 'ko' || props.lang === 'en' ? 'Pretendard' : 'Pretendard JP')}, sans-serif;
`;

function App() {
  // useTranslation: 다국어 설정
  const { t } = useTranslation();
  const lang = process.env.REACT_APP_LOCALE;

  // Helmet: 메타태그 설정
  // APIProvider: APIContext 제공
  // ScrollToTop: 페이지 이동시 최상단으로 이동
  // Outlet: 라우터 설정
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
          <APIProvider2>
            <AdProvider>
              <FontWrapper lang={lang}>
                <ScrollToTop />
                <Outlet />
              </FontWrapper>
            </AdProvider>
          </APIProvider2>
        </APIProvider>
      </QueryClientProvider>
    </>
  );
}
export default App;
