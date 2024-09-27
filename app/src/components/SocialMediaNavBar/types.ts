import type { AccountLink } from '@/types';

/**
 * Props for the SocialMediaNavBar component.
 *
 * @type {object} SocialMediaNavBarProps
 * @property {string} [className] - Additional class names for the SocialMediaNavBar
 * @property {string} [changeLinkColor] -
 * @property {('left-nav' | 'right-nav' | 'card')} [type] - Type of SocialMediaNavBar placed
 * on the page or in Card component.
 * @property {CryptoKey} [cryptoKey] - Encryption data to hide email address.
 * @property {AccountLink[]} [buttons] - SocialMediaNavBar button definition data.
 * @property {string} [url] - The URL to fetch the data needed by the SocialMediaNavBar component.
 *
 * @al-dev93
 */
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

/**
 * Props for the SocialMediaButton component.
 *
 * @type {object} SocialMediaButtonProps
 * @property {string} [className] - Additional class names to apply to the button.
 * @property {AccountLink} button - The button data.
 * @property {CryptoKey} [cryptoKey] - Crypto key for encryption.
 *
 * @al-dev93
 */
export type SocialMediaButtonProps = {
  className?: string;
  button: AccountLink;
  cryptoKey?: CryptoKey;
};
