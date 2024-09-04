import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
/**
 *
 * @description custom hook to checks if an HTML element is visible within the viewport.
 *
 * @param {RefObject<HTMLElement>} sectionRef - The reference to the HTML element to observe.
 * @param {string} [rootMargin='0px'] - The margin around the root. Can have values similar to the CSS margin property.
 * @returns {boolean} A boolean state indicating whether the element is visible.
 *
 * @al-dev93
 */
export function useOnScreen(sectionRef: RefObject<HTMLElement>, rootMargin: string = '0px'): boolean {
  // State to store whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  // Callback function to handle intersection changes
  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setIntersecting(entry.isIntersecting);
  }, []);

  // Memoized options for the IntersectionObserver
  const observerOptions = useMemo(() => ({ rootMargin }), [rootMargin]);

  useEffect(() => {
    const targetElement = sectionRef.current;

    // Ensure the InteractionObserver is supported
    if (!targetElement || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
      observer.disconnect();
    };
  }, [handleIntersection, observerOptions, sectionRef]);

  return isIntersecting;
}
