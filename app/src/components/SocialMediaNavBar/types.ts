import type { AccountLink, Deliverable } from '@/types';
import type { FetchErrorContext } from '@modules/Error/types';

type SocialMediaNavBarVariant = 'page-desktop' | 'page-mobile' | 'card' | 'slideshow';
/**
 * Props for the SocialMediaNavBar component.
 *
 * @type {object} SocialMediaNavBarProps
 * @property {string} [className] - Additional class names for the SocialMediaNavBar
 * @property {string} [changeLinkColor] -
 * @property {SocialMediaNavBarVariant} [variant] - Type of SocialMediaNavBar placed
 * on the page or in Card component.
 * @property {CryptoKey} [cryptoKey] - Encryption data to hide email address.
 * @property {AccountLink[]} [buttons] - SocialMediaNavBar button definition data.
 *
 */
export interface SocialMediaNavBarProps {
  className?: string;
  classNameButton?: string;
  variant?: SocialMediaNavBarVariant;
  buttons?: AccountLink[] | Deliverable[];
}

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
export interface SocialMediaButtonProps {
  className?: string;
  button: AccountLink | Deliverable;
}

/**
 * Extended error context interface specific to SocialMediaButton component errors.
 * Provides detailed metadata about social media button-related errors.
 *
 * @export
 * @interface SocialMediaButtonErrorContext
 * @extends {FetchErrorContext}
 * @property {string} address - The encrypted or invalid address that caused the error.
 */
export interface SocialMediaButtonErrorContext extends FetchErrorContext {
  component: string;
  operation: string;
  address: string | undefined;
}

export type ServiceType = 'gmail' | 'linkedin' | 'github' | 'npm' | 'external' | 'document' | 'figma';
