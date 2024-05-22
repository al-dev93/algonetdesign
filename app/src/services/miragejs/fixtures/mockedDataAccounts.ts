import { EncryptedMail } from '@/types';

// TODO: add comments
export const dataAccounts = (encryptedEmail: EncryptedMail) => [
  {
    service: 'gmail',
    onPage: true,
    address: `mailto:${encryptedEmail.encryptedEmail}`,
    iv: encryptedEmail.iv,
  },
  {
    service: 'linkedin',
    onPage: true,
    address: 'https://www.linkedin.com/in/alain-larose/',
  },
  {
    service: 'github',
    onPage: true,
    address: 'https://github.com/al-dev93',
  },
  {
    service: 'npm',
    address: 'https://www.npmjs.com',
  },
  {
    service: 'figma',
    address: 'https://www.figma.com',
  },
  {
    service: 'external',
    address: 'http://localhost/private',
  },
  {
    service: 'document',
    address: 'http://localhost/private/documents',
  },
];
