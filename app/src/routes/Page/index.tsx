import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { CollapsibleHeader } from '@/modules/CollapsibleHeader';
import { useFetchData } from '@/hooks/useFetchData';

import logo from '@images/brand/logoAND.png';

import type { OnSectionView, OutletContextPage } from '@/types';
import style from './style.module.css';
/**
 *
 * @description layout page containing common elements
 * @export
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function Page(): JSX.Element {
  // TODO: add comments
  const { accountList, menuList } = useFetchData();
  console.log(accountList, menuList);
  const { pathname, hash, key } = useLocation();
  // COMMENT: scroll level achieved after using the navigation menu
  const scrollWithNav = useRef<number>();
  // COMMENT: stores the result of the useOnScreen hook applied to the
  //  Index page to indicate the on screen section in the menu
  const outletContext = useRef<OnSectionView>();
  // COMMENT: sets the scroll level after a page change or after using
  //  the menu and the anchors elements
  useEffect((): void => {
    if (hash === '') window.scrollTo(0, 0);
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
          scrollWithNav.current = window.scrollY;
        }
      }, 0);
    }
  }, [hash, pathname, key]);

  return (
    <div className={style.page}>
      <CollapsibleHeader
        logo={{ src: logo, alt: 'logo' }}
        menu={menuList}
        onViewMap={outletContext}
        scrollWithOption={scrollWithNav}
      />
      <main className={style.main}>
        <Outlet context={{ outletContext } satisfies OutletContextPage} />
      </main>
      <footer>about</footer>
    </div>
  );
}
