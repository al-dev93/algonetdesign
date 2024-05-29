import { AccountLink } from '@/types';

export type SocialMediaNavBarProps = {
  className?: string;
  changeLinkColor?: string;
  type?: 'left-nav' | 'right-nav' | 'card';
  buttons: AccountLink[] | undefined;
  cryptoKey?: CryptoKey;
};

export type SocialMediaButtonProps = {
  className?: string;
  button: AccountLink;
  cryptoKey?: CryptoKey;
};
