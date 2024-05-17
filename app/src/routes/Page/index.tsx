import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '@assets/logoAND.png';
import { CollapsibleHeaderState, useCollapsibleHeader } from '../../hooks/useCollapsibleHeader.ts';

import style from './style.module.css';

/**
 *
 * @description //TODO: À compléter
 * @export
 * @return {*}  {JSX.Element}
 */
export function Page(): JSX.Element {
  // TODO: À commenter
  const { pathname, hash, key } = useLocation();
  // TODO: À commenter
  const headerState = useCollapsibleHeader(hash);
  // TODO: À commenter
  useEffect((): void => {
    if (hash === '') window.scrollTo(0, 0);
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [hash, pathname, key]);

  /**
   *
   * @description //TODO: À compléter
   * @param {CollapsibleHeaderState} state
   * @return {*}  {string}
   */
  const showingHeader = (state: CollapsibleHeaderState): string => {
    if (state === -1) return style.hidden;
    if (state === 0) return style.topOfPage;
    return style.visible;
  };

  return (
    <div className={style.page}>
      <header className={`${style.header} ${showingHeader(headerState)}`}>
        <Link to='/'>
          <img className={style.logo} src={logo} alt='' />
        </Link>
        <nav>
          <ul>
            <li>
              <NavLink to='/#p2'>accueil</NavLink>
            </li>
            <li>
              <NavLink to='/#p10'>réalisations</NavLink>
            </li>
            <li>
              <NavLink to='' />
            </li>
          </ul>
        </nav>
      </header>
      <main className={style.main}>
        <Outlet />
      </main>
      <footer>about</footer>
    </div>
  );
}
