import React, { memo, useCallback, useEffect, useMemo } from 'react';

import type { AccountLink, Deliverable } from '@/types';
import { useFetchData } from '@hooks/useFetchData';
import { useErrorHandler } from '@modules/Error/hooks/useErrorHandler';
import { createError } from '@modules/Error/utils/errorHandling';
import { handleFetchError } from '@utils/fetchDataHelpers';

import { SocialMediaButton } from './components/SocialMediaButton';
import style from './style.module.css';
import type { SocialMediaNavBarProps } from './types';
import { AppIcon } from '../AppIcon';

/**
 *
 * socialMediaNavBar component that displays a navigation bar with social media buttons.
 *
 * @component
 * @param {SocialMediaNavBarProps} props -The properties for the SocialMediaNavBar component.
 * @property {string} [className] - Additional class names for the SocialMediaNavBar
 * @property {SocialMediaNavBarVariant} [variant] - Type of SocialMediaNavBar placed
 * on the page or in Card component.
 * @property {AccountLink[]} [buttons] - SocialMediaNavBar button definition data.
 * @returns {React.JSX.Element} The rendered SocialMediaNavBar component.
 *
 * @al-dev93
 */
export const SocialMediaNavBar = memo(function SocialMediaNavBar({
  className,
  classNameButton,
  variant,
  buttons,
  onAnchorNavigation,
}: SocialMediaNavBarProps): React.JSX.Element | null {
  const isPageNav = variant === 'page-desktop' || variant === 'page-mobile';
  const isMobilePageNav = variant === 'page-mobile';
  const handleError = useErrorHandler();
  // Determine if we should fetch data based on the presence of buttons
  const shouldFetch = !buttons;
  // Use useFetchData hook if shouldFetch is true
  const endpoint = useMemo(() => (shouldFetch ? import.meta.env.VITE_API_ACCOUNTS_DATA_ENDPOINT : null), [shouldFetch]);
  const { data: fetchedData, fetchError } = useFetchData({
    endpoint,
    edgeFunction: true,
  });

  useEffect(() => {
    if (fetchError) {
      void handleFetchError('SocialMediaNavBar', fetchError, handleError);
    }
  }, [fetchError, handleError]);

  /**
   * Checks the validity of mandatory props and data after filtering and selection
   *
   * @function handleSocialMediaData
   * @returns {(checkCategory?: 'props') => Promise<void>}
   */
  const handleSocialMediaData = useCallback(
    async (checkCategory?: 'props'): Promise<void> => {
      const { code, message, operation, category } = (() => {
        if (checkCategory === 'props') {
          return {
            code: 1001,
            message: 'No data provided for social media links.',
            operation: 'render',
            category: 'UI Component',
          };
        }
        return {
          code: 1005,
          message: 'No valid social media links found.',
          operation: 'filterData',
          category: 'Dynamic Rendering',
        };
      })();
      await handleError(
        createError(code, message, {
          operation,
          component: 'SocialMediaNavBar',
          url: window.location.href,
          category,
        }),
      );
    },
    [handleError],
  );

  /**
   *  Use buttons if provided, otherwise use fetched data
   *
   * @constant data
   * @type {AccountLink[] | Deliverable[]}
   */
  const data = useMemo<AccountLink[] | Deliverable[]>(() => {
    return isPageNav
      ? ((buttons || fetchedData) as AccountLink[])?.filter((item) => item.onPage)
      : buttons || (fetchedData as Deliverable[]);
  }, [buttons, fetchedData, isPageNav]);

  /**
   *
   *
   * @param {string} service
   * @return {string} the composed class names based on the component state.
   */
  const getButtonClassName = (service: string): string => {
    const classNames: string[] = [];

    if (isPageNav) {
      classNames.push(style.socialMediaNavBar__pageLink);
    } else if (classNameButton) {
      classNames.push(classNameButton);
    }

    if (service === 'external' && (variant === 'slideshow' || variant === 'card')) {
      classNames.push(style['socialMediaNavBar__externalLink--primary']);
    }

    return classNames.join(' ');
  };

  useEffect(() => {
    if ((!endpoint || endpoint.length === 0) && (!buttons || buttons.length === 0)) {
      handleSocialMediaData('props');
    } else if (data && data.length === 0) {
      handleSocialMediaData();
    }
  }, [endpoint, buttons, data, handleSocialMediaData]);

  if (fetchError) return null;

  return (
    <nav
      className={`${style.socialMediaNavBar} ${className ?? ''}`}
      data-variant={variant}
      aria-label={isMobilePageNav ? 'Navigation rapide' : 'Navigation réseaux sociaux et médias'}
    >
      <ul className={style.socialMediaNavBar__list}>
        {data?.map((element) => (
          <li key={`${element.service}`}>
            <SocialMediaButton className={getButtonClassName(element.service)} button={element} />
          </li>
        ))}
        {isMobilePageNav ? (
          <li>
            <a
              href='#footer'
              className={style.socialMediaNavBar__quickLinkButton}
              aria-label='Aller au pied de page'
              title='Aller au pied de page'
              onClick={onAnchorNavigation}
            >
              <span className={style.socialMediaNavBar__quickLink}>
                <AppIcon className={style.socialMediaNavBar__quickLinkIcon} weight='bold' iconName='quickLinkFooter' />
              </span>
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
});
