import { useEffect, useState } from 'react';
import { CollapsibleHeaderState } from '../types/mainPage.ts';
import { SCROLL_DOWN, SCROLL_UP, TOP_OF_SCREEN } from '../utils/collapsibleHeader.ts';

/**
 * @description // TODO: À compléter
 // TODO: À compléter
 * @export
 * @param {React.MutableRefObject<number | undefined>} scrollOnNav
 * @return {*} {CollapsibleHeaderState}
 */
export function useCollapsibleHeader(scrollOnNav: React.MutableRefObject<number | undefined>): CollapsibleHeaderState {
  // TODO: À commenter
  const [position, setPosition] = useState<number>(window.scrollY);
  // TODO: À commenter
  const [scrollState, setScrollState] = useState<CollapsibleHeaderState>(TOP_OF_SCREEN);
  // TODO: À commenter
  useEffect(() => {
    const handleScroll = () => {
      const stateOfScroll = scrollOnNav;
      const moving: number = window.scrollY;
      /**
       *
       * @description // TODO: À compléter
       * @return {*}  {CollapsibleHeaderState}
       */
      const stateOfMovement = (): CollapsibleHeaderState => {
        if (stateOfScroll.current === moving) return SCROLL_UP;
        stateOfScroll.current = undefined;
        switch (true) {
          case position >= moving && moving !== TOP_OF_SCREEN:
            return SCROLL_UP;
          case moving > position:
            return SCROLL_DOWN;
          default:
            return TOP_OF_SCREEN;
        }
      };
      setScrollState(stateOfMovement);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position, scrollOnNav]);
  // TODO: À commenter
  return scrollState;
}
