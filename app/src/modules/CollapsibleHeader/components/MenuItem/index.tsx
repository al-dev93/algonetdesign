import { NavLink } from 'react-router-dom';

import type { MenuItemProps } from '../../types';

import style from './style.module.css';
/**
 *
 * @description Menu item component. Contains the anchor to the section
 * and changes style when the section is displayed
 * @export
 * @param {MenuItemProps} { onView, label, anchor }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function MenuItem({ isVisible, label, anchor }: MenuItemProps): JSX.Element {
  return (
    <li>
      <NavLink className={isVisible ? style.onScrollView : style.regularItem} to={`/#${anchor}`}>
        {label}
      </NavLink>
    </li>
  );
}
