import { useEffect, useState } from 'react';

export type CollapsibleHeaderState = 0 | -1 | 1;

export function useCollapsibleHeader(): CollapsibleHeaderState {
  const [position, setPosition] = useState<number>(window.scrollY);
  const [state, setState] = useState<CollapsibleHeaderState>(0);

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.scrollY;
      const stateOfMovement = () => {
        switch (true) {
          case position > moving && moving > 0:
            return 1;
          case moving > position:
            return -1;
          default:
            return 0;
        }
      };
      setState(stateOfMovement);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return state;
}
