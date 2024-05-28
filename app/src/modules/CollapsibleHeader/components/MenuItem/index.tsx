import { NavLink } from 'react-router-dom';

import { MenuItemProps } from '../../types';
import style from './style.module.css';
/**
 *
 * @description
 * @export
 * @param {MenuItemProps} { onView, label, anchor }
 * @return {*}  {JSX.Element}
 */
export function MenuItem({ onView, label, anchor }: MenuItemProps): JSX.Element {
  return (
    <li>
      <NavLink className={onView ? style.onScrollView : ''} to={`/#${anchor}`}>
        {label}
      </NavLink>
    </li>
  );
}
