import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router.tsx';
import '@styles/variables.css';
import '@styles/global.css';

// TODO: À commenter
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router()} />
  </React.StrictMode>,
);
