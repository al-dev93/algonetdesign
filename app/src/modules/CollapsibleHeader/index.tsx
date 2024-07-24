import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useFetchData } from '@hooks/useFetchData';

import { MenuItem } from './components/MenuItem';
import { useCollapsibleHeader } from './hooks/useCollapsibleHeader';
import style from './style.module.css';
import { SCROLL_DOWN, TOP_OF_SCREEN } from './utils/constants';

import type { CollapsibleHeaderProps, CollapsibleHeaderState } from './types';
import type { MenuType } from '@/types';

/**
 *
 * @description Header component including a logo and a menu. It collapses when
 * the user scrolls down and expands with hover effect when the user scrolls up
 * @export
 * @param {CollapsibleHeaderProps} { logo, visibleSections, scrollWithMenuItem }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function CollapsibleHeader({ logo, visibleSections, scrollWithMenuItem }: CollapsibleHeaderProps): JSX.Element {
  const { data, setFetchOptionsData } = useFetchData();

  useEffect(() => {
    setFetchOptionsData('http://localhost:5173/api/menuItems', { method: 'GET' });
  }, [setFetchOptionsData]);

  // COMMENT: uses the custom hook useCollapsibleHeader to get the
  //  display state based on the scroll direction
  const headerState = useCollapsibleHeader(scrollWithMenuItem);
  const { src, alt } = logo || { src: undefined, alt: undefined };

  /**
   *
   * @description extracts the CSS class name based on the display states
   * of the header
   * @function
   * @param {CollapsibleHeaderState} state
   * @return {*}  {string}
   * @al-dev93
   */
  const showingHeader = (state: CollapsibleHeaderState): string => {
    if (state === SCROLL_DOWN) return style.hidden;
    if (state === TOP_OF_SCREEN) return style.topOfPage;
    return style.visible;
  };

  return (
    <header className={`${style.header} ${showingHeader(headerState)}`}>
      {logo && (
        <Link to='/'>
          <img className={style.logo} src={src} alt={alt} />
        </Link>
      )}
      <nav>
        <ul>
          {(data as MenuType[])?.map(({ label, anchor }) => (
            <MenuItem
              key={anchor}
              isVisible={visibleSections?.current[anchor as keyof typeof visibleSections.current]}
              label={label}
              anchor={anchor}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}
