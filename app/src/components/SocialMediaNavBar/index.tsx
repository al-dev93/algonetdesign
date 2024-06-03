import { AccountLink } from '@/types';
import { useFetchData } from '@hooks/useFetchData';
import verticalLine from '@images/decorations/vertical_line_decorative_light_mode.svg';

import { SocialMediaButton } from './SocialMediaButton';
import style from './style.module.css';

import type { SocialMediaNavBarProps } from './types';

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
 *   url,
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
  url,
  cryptoKey,
}: SocialMediaNavBarProps): JSX.Element {
  const isVerticalNav = type === 'left-nav' || type === 'right-nav';
  // COMMENT: determine if we should fetch data based on the presence of buttons
  const shouldFetch = !buttons;
  // COMMENT: only use useFetch if shouldFetch is true
  const { data: fetchedData } = useFetchData(shouldFetch ? url : null, { method: 'GET' });
  // COMMENT: otherwise use buttons
  const data = (buttons || (fetchedData as AccountLink[]))?.filter((item) => item.onPage);

  return (
    <nav className={`${className} ${style.socialMediaNavBar}`}>
      <ul className={isVerticalNav ? style.VerticalNavBar : style.horizontalNavBar}>
        {data?.map((element) => (
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
