// import { useEffect } from 'react';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useFetchData } from '@hooks/useFetchData';

import { MenuItem } from './components/MenuItem';
import { useCollapsibleHeader } from './hooks/useCollapsibleHeader';
import style from './style.module.css';
import { SCROLL_DOWN, SCROLL_UP, TOP_OF_SCREEN } from './utils/constants';

import type { CollapsibleHeaderProps } from './types';
import type { MenuItemType } from '@/types';

/**
 *
 * Header component including a logo and a menu. It collapses when
 * the user scrolls down and expands with hover effect when the user scrolls up.
 *
 * @component
 * @param {CollapsibleHeaderProps} props - The properties for the CollapsibleHeader component.
 * @property {ImageType} [logo] - The logo to be displayed in the header.
 * @property {MenuItemType[]} [menu] - The menu items to be displayed in the header.
 * @property {MutableRefObject<MenuSectionsVisibility>} [MenuSectionsVisibility] - Reference to the visible sections
 * for tracking visibility.
 * @property {MutableRefObject<number | undefined>} scrollWithMenuItem - Reference to the scroll position with the menu item.

 * @returns {React.JSX.Element} The rendered header component
 *
 * @al-dev93
 */
export function CollapsibleHeader({
  logo,
  MenuSectionsVisibility,
  scrollWithMenuItem,
}: CollapsibleHeaderProps): React.JSX.Element {
  // TODO variable d'environnement
  const { data, error } = useFetchData('http://localhost:5173/api/menuItems', { method: 'GET' });

  /* Uses custom hook useCollapsibleHeader to get the
     display state based on the scroll direction      */
  const headerState = useCollapsibleHeader(scrollWithMenuItem);
  const { src, alt } = logo || { src: undefined, alt: undefined };

  /**
   * Memoized function to selects and returns the appropriates CSS class based on the state of the header.
   * If the headerState is unknown, it logs an error in the console.
   * This function will only re-select and return a new CSS class when `headerState` changes.
   *
   * @returns {string} The corresponding CSS class for the header state.
   * @throws {Error} if the `state` is not a valid header state, an exception is thrown // NOTE (optional)
   *
   * @al-dev93
   */
  const getHeaderClass = useMemo(() => {
    if (![SCROLL_DOWN, SCROLL_UP, TOP_OF_SCREEN].includes(headerState)) {
      // TODO: sortir l'erreur
      console.error(`Invalid headerSate: ${headerState}`);
    }

    return classNames(style.header, {
      [style['header--isHidden']]: headerState === SCROLL_DOWN,
      [style['header--isRegular']]: headerState === TOP_OF_SCREEN,
      [style['header--isHover']]: headerState === SCROLL_UP,
    });
  }, [headerState]);

  if (error) {
    // TODO: sortir l'erreur
    console.error(`Failed to load menu data: ${error}`);
  }

  return (
    <header className={getHeaderClass} aria-label='Collapsible Header'>
      {logo && (
        <Link to='/' aria-label='Home'>
          <img className={style.header__logo} src={src} alt={alt || ''} />
        </Link>
      )}
      <nav aria-label='Main navigation'>
        <ul className={style.menuList}>
          {(data as MenuItemType[])?.map(({ label, anchor }) => (
            <MenuItem
              key={anchor}
              isSectionVisible={MenuSectionsVisibility?.current[anchor as keyof typeof MenuSectionsVisibility.current]}
              label={label}
              anchor={anchor}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}
