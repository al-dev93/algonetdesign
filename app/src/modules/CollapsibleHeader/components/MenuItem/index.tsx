import classNames from 'classnames';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import style from './style.module.css';

import type { MenuItemProps } from '../../types';

/**
 * Menu item component. Contains the anchor to the section
 * and changes style when the section is displayed
 * //TODO: add comment memoized
 *
 * @component
 * @param {MenuItemProps} { isVisible, label, anchor }
 * @property {boolean} [isSectionVisible] - Indicates whether the linked section is currently visible on the screen.
 * @property {string} label - The label or text displayed for the menu item.
 * @property {SectionsRef} anchor - A string reference to the section the menu item links to.
 * @returns {React.JSX.Element}
 *
 * @al-dev93
 */
function MemoizedMenuItem({ isSectionVisible, label, anchor }: MenuItemProps): React.JSX.Element {
  return (
    <li>
      <NavLink
        className={classNames(style.itemMenu, { [style['itemMenu--isSectionVisible']]: isSectionVisible })}
        to={`/#${anchor}`}
      >
        {label}
      </NavLink>
    </li>
  );
}

export const MenuItem = memo(MemoizedMenuItem);
