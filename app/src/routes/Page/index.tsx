import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import logo from '@assets/logoAND.png';
import { CollapsibleHeaderState, OnSectionPage, OutletContextPage } from '../../types/mainPage.ts';
import { useCollapsibleHeader } from '../../hooks/useCollapsibleHeader.ts';
import { SCROLL_DOWN, TOP_OF_SCREEN } from '../../utils/collapsibleHeader.ts';

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
  const scrollOnNav = useRef<number>();
  // TODO: À commenter
  const headerState = useCollapsibleHeader(scrollOnNav);
  // TODO: À commenter
  const [outletContext, setOutletContext] = useState<OnSectionPage>();
  console.log(outletContext);
  // TODO: À commenter
  useEffect((): void => {
    if (hash === '') window.scrollTo(0, 0);
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
          scrollOnNav.current = window.scrollY;
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
    if (state === SCROLL_DOWN) return style.hidden;
    if (state === TOP_OF_SCREEN) return style.topOfPage;
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
              <NavLink to='/#p1'>accueil</NavLink>
            </li>
            <li>
              <NavLink to='/#p3'>réalisations</NavLink>
            </li>
            <li>
              <NavLink to='/#p6'>À propos</NavLink>
            </li>
            <li>
              <NavLink to='/#p9'>Services</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className={style.main}>
        <Outlet context={{ setOutletContext } satisfies OutletContextPage} />
      </main>
      <footer>about</footer>
    </div>
  );
}
