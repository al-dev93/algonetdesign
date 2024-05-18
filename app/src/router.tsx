import { createBrowserRouter } from 'react-router-dom';
// COMMENT: importing application routes
import { Page } from './routes/Page/index.tsx';
import { Error } from './routes/Error/index.tsx';
import { Admin } from './routes/Admin/index.tsx';
import { LegalNotice } from './routes/LegalNotice/index.tsx';
import { Index } from './routes/Index/index.tsx';

/**
 * @description // TODO: À compléter
 * @return {*} {() => Router}
 */
export const router = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Page />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: '/legal-notice',
          element: <LegalNotice />,
        },
      ],
    },
    {
      path: '/admin',
      element: <Admin />,
    },
  ]);
};
