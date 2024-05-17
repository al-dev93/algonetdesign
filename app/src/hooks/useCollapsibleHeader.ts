import { useEffect, useRef, useState } from 'react';

export type CollapsibleHeaderState = 0 | -1 | 1;

/**
 * @description // TODO: À compléter
 * @export
 * @param {string} hash
 * @return {*} {CollapsibleHeaderState}
 */
export function useCollapsibleHeader(hash: string): CollapsibleHeaderState {
  // TODO: À commenter
  const [position, setPosition] = useState<number>(window.scrollY);
  // TODO: À commenter
  const [scrollState, setScrollState] = useState<CollapsibleHeaderState>(0);
  // TODO: À commenter (id atteint)
  const idReached = useRef<boolean>();
  // TODO: À commenter
  const firstRender = useRef<boolean>();
  // TODO: À commenter
  useEffect(() => {
    if (hash) {
      firstRender.current = true;
      idReached.current = true;
    }
  }, [hash]);
  // TODO: À commenter
  useEffect(() => {
    const handleScroll = () => {
      const moving: number = window.scrollY;
      /**
       *
       * @description // TODO: À compléter
       * @return {*}  {CollapsibleHeaderState}
       */
      const stateOfMovement = (): CollapsibleHeaderState => {
        switch (true) {
          case position >= moving && moving !== 0:
            return 1;
          case moving > position:
            return -1;
          default:
            return 0;
        }
      };
      setScrollState(stateOfMovement);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position]);
  // TODO: À commenter
  if (idReached.current && firstRender.current) {
    firstRender.current = false;
    return 1;
  }
  // TODO: À commenter
  if (idReached.current) {
    idReached.current = undefined;
    return 1;
  }
  // TODO: À commenter
  return scrollState;
}
