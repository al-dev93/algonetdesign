import type { AccountLink } from '@/types';

export type SocialMediaNavBarProps = {
  className?: string;
  changeLinkColor?: string;
  type?: 'left-nav' | 'right-nav' | 'card';
  cryptoKey?: CryptoKey;
} & (
  | {
      buttons?: AccountLink[];
      url?: never;
    }
  | {
      buttons?: never;
      url?: string;
    }
);

export type SocialMediaButtonProps = {
  className?: string;
  button: AccountLink;
  cryptoKey?: CryptoKey;
};
