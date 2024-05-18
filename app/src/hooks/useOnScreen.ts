import { useEffect, useState } from 'react';

export function useOnScreen(sectionRef: React.RefObject<HTMLElement>, rootMargin = '0px') {
  // TODO: vérify State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

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
