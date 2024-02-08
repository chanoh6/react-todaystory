import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ContentDetail from './pages/ContentDetail';
import Contents from './pages/Contents';
import NotFound from './pages/NotFound';

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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
