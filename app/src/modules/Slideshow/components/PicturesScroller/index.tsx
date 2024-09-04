import React, { useEffect, useRef } from 'react';

import style from './style.module.css';
import { STOP } from '../../utils/constants';

import type { PicturesScrollerProps, PicturesScrollerSlide, SlideStyle } from '../../types';
import type { ProjectData } from '@/types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {PicturesScrollerProps} { slideContent, slideshowState, duration = 600 }
 * @return {React.JSX.Element}
 * @al-dev93
 */
export function PicturesScroller({
  slideContent,
  slideshowState,
  duration = 600,
}: PicturesScrollerProps): React.JSX.Element {
  const intitialSlideStyle: SlideStyle = {
    transform: `translateX(-100%)`,
    transition: `none`,
  };
  const startSlide = slideContent[slideContent.length - 1];
  const endSlide = slideContent[0];
  const slideEffectStyle = useRef<SlideStyle>(intitialSlideStyle);

  /**
   * @description // TODO: add comment
   */
  useEffect(() => {
    if (slideshowState.loopSlide && slideshowState.slideTransition === STOP)
      slideEffectStyle.current = {
        transform: `translateX(${-(slideshowState.new + 1) * 100}%)`,
        transition: 'none',
      };
  }, [slideshowState.loopSlide, slideshowState.new, slideshowState.slideTransition]);
  /**
   * @description // TODO: add comment
   */
  useEffect(() => {
    /**
     *
     * @description // TODO: add comment
     * @return {*}  {number}
     * @al-dev93
     */
    const offsetSlide = (): number => {
      if (slideshowState.new === 0 && slideshowState.loopSlide) return -(slideshowState.maxIndexSlide + 2);
      if (slideshowState.new === slideshowState.maxIndexSlide && slideshowState.loopSlide)
        return slideshowState.maxIndexSlide;
      return -1;
    };

    slideEffectStyle.current = {
      transform: `translateX(${(-slideshowState.new + offsetSlide()) * 100}%)`,
      transition: `ease ${duration}ms`,
    };
  }, [duration, slideshowState.loopSlide, slideshowState.maxIndexSlide, slideshowState.new]);

  /**
   *
   * @description // TODO: add comment
   * @param {ProjectData} project
   * @return {*}  {PicturesScrollerSlide}
   * @al-dev93
   */
  const getSlide = (project: ProjectData): PicturesScrollerSlide => {
    const { address } = project.deliverables.find((item) => item.service === 'external') as {
      address: string | undefined;
    };
    const { title, picture } = project;
    return { address, picture, title };
  };

  return (
    <div className={style.picturesScroller}>
      <div className={style.picturesToScroll} style={slideEffectStyle.current}>
        <a
          href={getSlide(startSlide).address}
          target='_blank'
          rel='noopener noreferrer'
          className={style.slide}
          aria-label={`Link to ${getSlide(startSlide).title} website`}
        >
          <img className={style.picture} src={getSlide(startSlide).picture} alt='' />
        </a>
        {slideContent.map((value) => (
          <a
            href={getSlide(value).address}
            key={value.id}
            target='_blank'
            rel='noopener noreferrer'
            className={style.slide}
            aria-label={`Link to ${value.title} website`}
          >
            <img className={style.picture} src={value.picture} alt='' />
          </a>
        ))}
        <a
          href={getSlide(endSlide).address}
          target='_blank'
          rel='noopener noreferrer'
          className={style.slide}
          aria-label={`Link to ${getSlide(endSlide).title} website`}
        >
          <img className={style.picture} src={getSlide(endSlide).picture} alt='' />
        </a>
      </div>
    </div>
  );
}
