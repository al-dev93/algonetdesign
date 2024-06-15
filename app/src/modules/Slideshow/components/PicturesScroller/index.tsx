import { useEffect, useRef } from 'react';

import style from './style.module.css';
import { STOP } from '../../utils/constants';

import type { PicturesScrollerProps, PicturesScrollerSlide, SlideStyle } from '../../types';
import type { ProjectData } from '@/types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {PicturesScrollerProps} { slideContent, slideshowState, duration = 600 }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function PicturesScroller({ slideContent, slideshowState, duration = 600 }: PicturesScrollerProps): JSX.Element {
  const intitialSlideStyle: SlideStyle = {
    transform: `translateX(-100%)`,
    transition: `none`,
  };
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
   * @param {('first' | 'last' | ProjectData)} key
   * @return {*}  {PicturesScrollerSlide}
   * @al-dev93
   */
  const getSlide = (key: 'first' | 'last' | ProjectData): PicturesScrollerSlide => {
    switch (key) {
      case 'first': {
        const { title, picture } = slideContent[slideContent.length - 1];
        const { address } = slideContent[slideContent.length - 1].deliverables.find(
          (item) => item.service === 'external',
        ) as { address: string | undefined };
        return { title, picture, address };
      }
      case 'last': {
        const { title, picture } = slideContent[0];
        const { address } = slideContent[0].deliverables.find((item) => item.service === 'external') as {
          address: string | undefined;
        };
        return { title, picture, address };
      }
      default: {
        const { title, picture } = key;
        const { address } = key.deliverables.find((item) => item.service === 'external') as {
          address: string | undefined;
        };
        return { title, picture, address };
      }
    }
  };

  return (
    <div className={style.picturesScroller}>
      <div className={style.picturesToScroll} style={slideEffectStyle.current}>
        <a
          href={getSlide('first').address}
          className={style.slide}
          aria-label={`Link to ${getSlide('first').title} website`}
        >
          <img className={style.picture} src={getSlide('first').picture} alt='' />
        </a>
        {slideContent.map((value) => (
          <a
            href={getSlide(value).address}
            key={value.id}
            className={style.slide}
            aria-label={`Link to ${value.title} website`}
          >
            <img className={style.picture} src={value.picture} alt='' />
          </a>
        ))}
        <a
          href={getSlide('last').address}
          className={style.slide}
          aria-label={`Link to ${getSlide('last').title} website`}
        >
          <img className={style.picture} src={getSlide('last').picture} alt='' />
        </a>
      </div>
    </div>
  );
}
