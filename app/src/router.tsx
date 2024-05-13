import { createBrowserRouter } from 'react-router-dom';
// COMMENT: importing application routes
import { Page } from './routes/Page/index.tsx';
import { Error } from './routes/Error/index.tsx';
import { Admin } from './routes/Admin/index.tsx';

export const router = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Page />,
      errorElement: <Error />,
    },
    {
      path: '/admin',
      element: <Admin />,
    },
  ]);
};
