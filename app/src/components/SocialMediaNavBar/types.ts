import type { AccountLink } from '@/types';

export type SocialMediaNavBarProps =
  | {
      className?: string;
      changeLinkColor?: string;
      type?: 'left-nav' | 'right-nav' | 'card';
      buttons?: AccountLink[];
      url?: undefined;
      cryptoKey?: CryptoKey;
    }
  | {
      className?: string;
      changeLinkColor?: string;
      type?: 'left-nav' | 'right-nav' | 'card';
      buttons?: undefined;
      url?: string;
      cryptoKey?: CryptoKey;
    };

export type SocialMediaButtonProps = {
  className?: string;
  button: AccountLink;
  cryptoKey?: CryptoKey;
};
