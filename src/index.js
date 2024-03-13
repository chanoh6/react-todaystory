import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {
  Home,
  Story,
  CategoryStories,
  ChannelStories,
  FavoriteStories,
  HistoryStories,
  NotFound,
  PrivacyPolicy,
  TermsOfService,
  CookieList,
  DoNotSellInfo,
} from 'pages';
import 'styles/index.css';
import App from 'App';
import 'locales/i18n';

/**
 * @TODOS
 * -- 1. router 경로 재설정
 * 2. 최상단 경로에 lang 설정
 * */

const router = createBrowserRouter([
  {
    // path: `/${process.env.REACT_APP_LOCALE}/`,
    path: `/`,
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'view/:contentId', element: <Story /> },
      { path: 'category/:pageId', element: <CategoryStories /> },
      { path: 'channel/:pageId', element: <ChannelStories /> },
      { path: 'favorite', element: <FavoriteStories /> },
      { path: 'history', element: <HistoryStories /> },
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
