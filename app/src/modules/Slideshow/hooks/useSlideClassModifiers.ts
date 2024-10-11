import { useCallback, useMemo } from 'react';

import { ProjectData } from '@/types';

import { SlideshowState } from '../types';

/**
 * Custom hook to manage CSS class names for slideshow slides.
 *
 * @function
 * @param {SlideshowState} slideshowState - The current state of the slideshow
 * @param {ProjectData[]} slideContent - The content of the slides.
 * @returns {{ getClassModifier: (index: number) => string[]; isAdjacent: (index: number) => boolean }} An object with
 * helper functions for class handling.
 */
export function useSlideClassModifiers(slideshowState: SlideshowState, slideContent: ProjectData[]) {
  /**
   * Returns the appropriate class names for each slide based on its position in the slideshow.
   * Determines whether the slide is visible, adjacent or hidden.
   *
   * @param {number} index - The index of the current slide.
   * @returns {string[]} An array of classe names to apply to the slide.
   */
  const getClassModifier = useCallback(
    (index: number): string[] => {
      const styles = [`picturesToScroll`];

      const isCurrentSlide = index === slideshowState.new;
      const isAdjacentSlide = index === slideshowState.new - 1 || index === slideshowState.new + 1;

      // Direct checks for first and last slides with looping.
      const isEdgeLooping =
        (index === 0 && slideshowState.loopSlide) || (index === slideContent.length - 1 && slideshowState.loopSlide);

      // Assign CSS classes based on conditions
      if (isCurrentSlide) {
        return [...styles, `picturesToScroll--visible`, `picturesToScroll--parallaxOff`];
      }
      if (isAdjacentSlide || isEdgeLooping) {
        return [...styles, `picturesToScroll--adjacent`, `picturesToScroll--parallaxOn`];
      }
      return [...styles, `picturesToScroll--hidden`];
    },
    [slideContent.length, slideshowState.loopSlide, slideshowState.new],
  );

  /**
   * Determines whether a slide is adjacent to the current slide.
   * It returns true if the slide is either before or after the current slide.
   *
   * @returns {((index: number) => boolean)} A function that checks if a slide is adjacent.
   */
  const isAdjacent = useMemo((): ((index: number) => boolean) => {
    const currentIndex = slideshowState.current;
    return (index: number) => index === currentIndex - 1 || index === currentIndex + 1;
  }, [slideshowState]);

  // Returns the modified style classes and adjacency checking
  return { getClassModifier, isAdjacent };
}
