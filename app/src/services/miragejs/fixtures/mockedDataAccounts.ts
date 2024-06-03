import type { EncryptedMail } from '@/types';

// TODO: add comments
export const dataAccounts = (encryptedEmail: EncryptedMail) => [
  {
    service: 'gmail',
    icon: 'paper-plane-outline',
    onPage: true,
    address: encryptedEmail.encryptedEmail,
    iv: encryptedEmail.iv,
  },
  {
    service: 'linkedin',
    icon: 'logo-linkedin',
    onPage: true,
    address: 'https://www.linkedin.com/in/alain-larose/',
  },
  {
    service: 'github',
    icon: 'logo-github',
    onPage: true,
    address: 'https://github.com/al-dev93',
  },
  {
    service: 'npm',
    icon: 'logo-npm',
    address: 'https://www.npmjs.com',
  },
  {
    service: 'figma',
    icon: 'logo-figma',
    address: 'https://www.figma.com',
  },
  {
    service: 'external',
    icon: 'open-outline',
    address: 'http://localhost/private',
  },
  {
    service: 'document',
    icon: 'document-outline',
    address: 'http://localhost/private/documents',
  },
];
