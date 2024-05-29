import IonIcon from '@reacticons/ionicons';

import { decryptData } from '@services/secure/mockedEncryption';

import type { SocialMediaButtonProps } from '../types';
import style from './style.module.css';
/**
 *
 * @description navigation bar button component. For mail links,
 * the address is encrypted to avoid being displayed in plain text.
 * IonIcons are used for the button icons
 * @export
 * @param {SocialMediaButtonProps} { className, button, cryptoKey }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function SocialMediaButton({ className, button, cryptoKey }: SocialMediaButtonProps): JSX.Element {
  const { icon, address, iv } = button;
  /**
   *
   * @description callback function triggered by the button's onClick event. When
   * the send mail button is clicked, it encrypts the email address and opens the
   * email client for composing a new message
   * @callback
   * @param {React.MouseEvent} e
   * @return {*}  {(Promise<string | undefined>)}
   * @al-dev93
   */
  async function handleClick(e: React.MouseEvent): Promise<string | undefined> {
    e.preventDefault();
    const mailTo = `mailto:${await decryptData(address, iv, cryptoKey)}`;
    window.location.href = mailTo;
    return;
  }

  return (
    <a
      className={style.buttonLink}
      href={button.address}
      target='_blank'
      rel='noopener noreferrer'
      onClick={button.service === 'gmail' ? handleClick : undefined}
    >
      <IonIcon className={`${className} ${style.iconStyle}`} name={icon} />
    </a>
  );
}
