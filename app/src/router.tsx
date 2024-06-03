import { createBrowserRouter } from 'react-router-dom';

// COMMENT: importing application routes
import { Admin } from '@routes/Admin';
import { Auth } from '@routes/Auth';
import { Error } from '@routes/Error';
import { Index } from '@routes/Index';
import { LegalNotice } from '@routes/LegalNotice';
import { Page } from '@routes/Page';

/**
 *
 * @description // TODO: À compléter
 * @param {CryptoKey | undefined} key
 * @return {*} {(key: CryptoKey | undefined) => Router}
 * @al-dev93
 */
export const router = (key: CryptoKey | undefined) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Page cryptoKey={key} />,
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
      path: '/login',
      element: <Auth />,
    },
    {
      path: '/admin',
      element: <Admin />,
    },
  ]);
};
