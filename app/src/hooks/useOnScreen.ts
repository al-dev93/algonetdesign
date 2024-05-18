import { useEffect, useState } from 'react';
/**
 *
 * @description // TODO: À compléter
 * @export
 * @param {React.RefObject<HTMLElement>} sectionRef
 * @param {string} [rootMargin='0px']
 * @return {*}  {boolean}
 */
export function useOnScreen(sectionRef: React.RefObject<HTMLElement>, rootMargin = '0px'): boolean {
  // TODO: vérify State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const targetElement = sectionRef.current;
    if (!targetElement) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // TODO: vérify Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );
    if (targetElement) {
      observer.observe(targetElement);
    }
    return () => {
      observer.unobserve(targetElement);
    };
  }, [sectionRef, rootMargin]);

  return isIntersecting;
}
