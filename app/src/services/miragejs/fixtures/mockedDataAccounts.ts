import type { EncryptedMail } from '@/types';

// TODO: add comments
export const accounts = (encryptedEmail?: EncryptedMail) => [
  {
    id: '1',
    service: 'gmail',
    icon: 'paper-plane-outline',
    onPage: true,
    address: encryptedEmail?.encryptedEmail,
    iv: encryptedEmail?.iv,
  },
  {
    id: '2',
    service: 'linkedin',
    icon: 'logo-linkedin',
    onPage: true,
    address: 'https://www.linkedin.com/in/alain-larose/',
  },
  {
    id: '3',
    service: 'github',
    icon: 'logo-github',
    onPage: true,
    address: 'https://github.com/al-dev93',
  },
  {
    id: '4',
    service: 'npm',
    icon: 'logo-npm',
    address: 'https://www.npmjs.com',
  },
  {
    id: '5',
    service: 'figma',
    icon: 'logo-figma',
    address: 'https://www.figma.com',
  },
  {
    id: '6',
    service: 'external',
    icon: 'open-outline',
    address: 'http://localhost/private',
  },
  {
    id: '7',
    service: 'document',
    icon: 'document-outline',
    address: 'http://localhost/private/documents',
  },
];
