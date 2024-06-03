import { useEffect, useState } from 'react';

import { SCROLL_DOWN, SCROLL_UP, TOP_OF_SCREEN } from '../utils/constants';

import type { CollapsibleHeaderState } from '../types';

/**
 * @description custom hook managing a collapsible header based on scroll position.
 * It returns 3 states corresponding to the top of screen, scroll-up and scroll-down
 * @export
 * @param {React.MutableRefObject<number | undefined>} scrollWithMenuItem
 * @return {*} {CollapsibleHeaderState}
 * @al-dev93
 */
export function useCollapsibleHeader(
  scrollWithMenuItem: React.MutableRefObject<number | undefined>,
  // scrollWithMenuItem: number | undefined,
): CollapsibleHeaderState {
  // COMMENT: initial scroll position
  const [position, setPosition] = useState<number>(window.scrollY);
  // COMMENT: scroll state
  const [scrollState, setScrollState] = useState<CollapsibleHeaderState>(TOP_OF_SCREEN);
  // COMMENT: detects the scroll event and determines the direction based on the initial position and movement
  useEffect(() => {
    /**
     * @description
     * @callback
     * @al-dev93
     */
    const handleScroll = () => {
      // COMMENT: indicates scrolling performed by the menu
      // let stateOfScroll = scrollWithMenuItem.current;
      const moving: number = window.scrollY;
      /**
       *
       * @description determines the scroll state based on the initial position, movement and scrolling
       * via the menu (scrollOnNav)
       * @callback
       * @return {*}  {CollapsibleHeaderState}
       * @al-dev93
       */
      const stateOfMovement = (): CollapsibleHeaderState => {
        const useMenu = scrollWithMenuItem;
        // if (stateOfScroll === moving) return SCROLL_UP;
        // stateOfScroll = undefined;
        console.log(scrollWithMenuItem.current, moving);
        if (useMenu.current === moving) return SCROLL_UP;
        useMenu.current = undefined;
        // if (scrollWithMenuItem === moving) return SCROLL_UP;
        // scrollWithMenuItem = undefined;
        switch (true) {
          case position >= moving && moving !== TOP_OF_SCREEN:
            return SCROLL_UP;
          case moving > position:
            return SCROLL_DOWN;
          default:
            return TOP_OF_SCREEN;
        }
      };
      setScrollState(stateOfMovement());
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position, scrollWithMenuItem]);
  return scrollState;
}
