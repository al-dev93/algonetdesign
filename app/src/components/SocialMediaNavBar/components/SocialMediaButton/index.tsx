import IonIcon from '@reacticons/ionicons';
import React, { MouseEvent } from 'react';

import { decryptData } from '@services/secure/mockedEncryption';

import style from './style.module.css';

import type { SocialMediaButtonProps } from '../../types';

/**
 *
 * @description SocialMediaButton component for rendering a button with a social media link.
 * For mail links, the address is encrypted to avoid being displayed in plain text.
 * IonIcons are used for the button icons.
 *
 * @param {SocialMediaButtonProps} props - The properties for the SocialMediaButton component.
 * @returns {React.JSX.Element} The rendered social media button component.
 *
 * @al-dev93
 */
export function SocialMediaButton({ className, button, cryptoKey }: SocialMediaButtonProps): React.JSX.Element {
  const { icon, address, iv, service } = button;

  /**
   * @description Handles the click event for the button. Encrypts the email address and
   * opens the email client for composing a new message.
   *
   * @param {MouseEvent} e - The mouse event
   * @returns {Promise<string | undefined>} The mailto link or undefined.
   */
  async function handleClick(e: MouseEvent): Promise<string | undefined> {
    e.preventDefault();
    try {
      const mailTo = `mailto:${await decryptData(address, iv, cryptoKey)}`;
      window.location.href = mailTo;
      return undefined;
    } catch (error) {
      // TODO: sortir l'erreur
      console.error('Error decrypting email address:', error);
      return undefined;
    }
  }
  // console.log('button');

  return (
    <a
      className={`${className} ${style.buttonLink}`}
      href={button.address}
      target='_blank'
      rel='noopener noreferrer'
      type='button'
      aria-label={`Link to ${service}`}
      onClick={button.service === 'gmail' ? handleClick : undefined}
    >
      <IonIcon
        className={`${className} ${style.buttonLink__icon}`}
        name={icon}
        role='img'
        aria-label={`Icon ${service}`}
      />
    </a>
  );
}
