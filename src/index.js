import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {
  Home,
  Story,
  Category,
  Channel,
  Favorite,
  History,
  NotFound,
  PrivacyPolicy,
  TermsOfService,
  CookieList,
  DoNotSellInfo,
} from 'pages';
import 'styles/index.css';
import App from 'App';
import 'locales/i18n';

// react-router-dom의 createBrowserRouter를 사용하여 라우터를 생성합니다.
const router = createBrowserRouter([
  {
    // basename: `/${process.env.REACT_APP_LOCALE}`,
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'view/:contentId', element: <Story /> },
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
);
