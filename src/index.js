import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'styles/index.css';
import App from 'App';
import { Home, ContentDetail, Contents, NotFound, LikeContents, HistoryContents } from 'pages';
import 'locales/i18n';

/**
 * @TODOS
 * 1. router 경로 재설정
 * 2. .env 파일 활용하여 param 설정
 * */

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'view/:contentId', element: <ContentDetail /> },
      { path: ':pageId', element: <Contents /> },
      { path: 'like', element: <LikeContents /> },
      { path: 'recently', element: <HistoryContents /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
