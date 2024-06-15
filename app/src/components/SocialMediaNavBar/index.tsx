import { memo } from 'react';

import { useFetchData } from '@hooks/useFetchData';
import verticalLine from '@images/decorations/vertical_line_decorative_light_mode.svg';

import { SocialMediaButton } from './SocialMediaButton';
import style from './style.module.css';

import type { SocialMediaNavBarProps } from './types';
import type { AccountLink } from '@/types';

/**
 *
 * @description additional navigation bar component. Includes
 * buttons that link to social network, websites, and documents
 * // TODO: add comment memoized
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
function MemoizedSocialMediaNavBar({
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
  const data = type
    ? (buttons || (fetchedData as AccountLink[]))?.filter((item) => item.onPage)
    : buttons || (fetchedData as AccountLink[]);

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

export const SocialMediaNavBar = memo(MemoizedSocialMediaNavBar);
