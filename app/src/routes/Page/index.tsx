import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { SocialMediaNavBar } from '@components/SocialMediaNavBar';
import logo from '@images/brand/logoAND.png';
import { CollapsibleHeader } from '@modules/CollapsibleHeader';
import { ModalDialogContactForm } from '@modules/ModalDialogContactForm';

import style from './style.module.css';

import type { OutletContextPage, PageProps, MenuSectionsVisibility } from '@/types';

/**
 *
 * @description layout page containing common elements
 * @export
 * @param {PageProps} {cryptoKey}
 * @return {React.JSX.Element}
 * @al-dev93
 */
export function Page({ cryptoKey }: PageProps): React.JSX.Element {
  // TODO: add comments
  const { pathname, hash, key } = useLocation();
  // COMMENT: scroll level achieved after using the navigation menu
  const scrollWithNav = useRef<number>();
  // COMMENT: stores the result of the useOnScreen hook applied to the
  //  Index page to indicate the on screen section in the menu
  const viewSectionContext = useRef<MenuSectionsVisibility>({});

  const [openContactFormDialog, setOpenContactFormDialog] = useState<boolean>(false);

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
          console.log(scrollWithNav.current);
        }
      }, 0);
    }
  }, [hash, pathname, key]);

  useEffect(() => {
    if (openContactFormDialog) {
      document.body.classList.add('scrollOff');
      return;
    }
    document.body.classList.remove('scrollOff');
  }, [openContactFormDialog]);

  return (
    <div className={style.page}>
      <CollapsibleHeader
        logo={{ src: logo, alt: 'logo' }}
        MenuSectionsVisibility={viewSectionContext}
        scrollWithMenuItem={scrollWithNav}
      />
      <ModalDialogContactForm
        open={openContactFormDialog}
        setOpen={setOpenContactFormDialog}
        url={['http://localhost:5173/api/contactFormModals', 'http://localhost:5173/api/contactFormInputs']}
      />
      <SocialMediaNavBar
        className={style.socialMediaNavBar}
        type='left-nav'
        url='http://localhost:5173/api/accounts'
        cryptoKey={cryptoKey}
      />

      <main className={style.main}>
        <Outlet context={{ viewSectionContext, setOpenContactFormDialog } satisfies OutletContextPage} />
      </main>
      <footer>Pied-de-page</footer>
    </div>
  );
}
