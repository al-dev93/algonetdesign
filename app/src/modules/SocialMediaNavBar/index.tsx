import { SocialMediaButton } from './SocialMediaButton';

import verticalLine from '@images/decorations/vertical_line_decorative_light_mode.svg';

import type { SocialMediaNavBarProps } from './types';
import style from './style.module.css';
/**
 *
 * @description additional navigation bar component. Includes
 * buttons that link to social network, websites, and documents
 * @export
 * @param {SocialMediaNavBarProps} {
 *   className,
 *   changeLinkColor,
 *   type,
 *   buttons,
 *   cryptoKey,
 * }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function SocialMediaNavBar({
  className,
  changeLinkColor,
  type,
  buttons,
  cryptoKey,
}: SocialMediaNavBarProps): JSX.Element {
  const isVerticalNav = type === 'left-nav' || type === 'right-nav';
  return (
    <nav className={`${className} ${style.socialMediaNavBar}`}>
      <ul className={isVerticalNav ? style.VerticalNavBar : style.horizontalNavBar}>
        {buttons?.map((element) => (
          <li key={`${element.service}`}>
            <SocialMediaButton
              className={`${style.externalLink} ${changeLinkColor}`}
              button={element}
              cryptoKey={cryptoKey}
            />
          </li>
        ))}
      </ul>
      {isVerticalNav && (
        <div className={style.lineWrapper}>
          <img className={style.verticalLine} src={verticalLine} alt='' />
        </div>
      )}
    </nav>
  );
}
