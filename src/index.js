import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Loading from 'components/Modal/Loading';
import 'styles/index.css';
import App from 'App';
import 'locales/i18n';

// React.lazy: 코드 스플리팅을 위한 함수 (Suspense와 함께 사용)
const Home = React.lazy(() => import('pages/Home'));
const Story = React.lazy(() => import('pages/Story'));
const StoryTest = React.lazy(() => import('pages/StoryTest'));
const Category = React.lazy(() => import('pages/Category'));
const Channel = React.lazy(() => import('pages/Channel'));
const Favorite = React.lazy(() => import('pages/Favorite'));
const History = React.lazy(() => import('pages/History'));
const PrivacyPolicy = React.lazy(() => import('pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('pages/TermsOfService'));
const CookieList = React.lazy(() => import('pages/CookieList'));
const DoNotSellInfo = React.lazy(() => import('pages/DoNotSellInfo'));
const NotFound = React.lazy(() => import('pages/NotFound'));

// createBrowserRouter: 라우터 생성
const router = createBrowserRouter([
  {
    // basename: process.env.PUBLIC_URL,
    element: <App />,
    errorElement: <NotFound />,
    path: process.env.PUBLIC_URL,
    children: [
      { index: true, element: <Home /> },
      { path: 'index.html', element: <Home /> },
      { path: 'view/:contentId', element: <Story /> },
      { path: 'views/:contentId', element: <StoryTest /> },
      { path: 'category/:pageId', element: <Category /> },
      { path: 'channel/:pageId', element: <Channel /> },
      { path: 'favorite', element: <Favorite /> },
      { path: 'history', element: <History /> },
      { path: 'policy/privacy', element: <PrivacyPolicy /> },
      { path: 'policy/service', element: <TermsOfService /> },
      { path: 'policy/cookie', element: <CookieList /> },
      { path: 'policy/doNotSell', element: <DoNotSellInfo /> },
    ],
  },
]);

// RouterProvider: 라우터 제공을 위한 Provider
// HelmetProvider: Helmet(메타태그)를 사용하기 위한 Provider
// Suspense: 로딩 중일 때 보여줄 컴포넌트
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <HelmetProvider>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </HelmetProvider>,
  // </React.StrictMode>,
);
