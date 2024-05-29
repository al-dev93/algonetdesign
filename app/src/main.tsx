import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { encryptEmail, generateKey } from '@secure/mockedEncryption';
import { makeServer } from '../src/services/miragejs/server';
import { router } from '@/router.tsx';

import '@styles/variables.css';
import '@styles/global.css';

let key: CryptoKey | undefined;
if (process.env.NODE_ENV === 'development') {
  key = await generateKey();
  const encryptedEmail = await encryptEmail('larose.alain@gmail.com', key);
  makeServer(encryptedEmail);
}
// TODO: À commenter
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router(key)} />
  </React.StrictMode>,
);
