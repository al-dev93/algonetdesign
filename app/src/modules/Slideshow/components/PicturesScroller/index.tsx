import { useEffect, useRef } from 'react';

import { ProjectData } from '@/types';

import style from './style.module.css';
import { STOP } from '../../utils/constants';

import type { PicturesScrollerProps, SlideStyle } from '../../types';

/**
 *
 * @description // TODO: add comment
 * @export
 * @param {PicturesScrollerProps} { slideContent, slide, state, duration = 600 }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function PicturesScroller({ slideContent, slide, state, duration = 600 }: PicturesScrollerProps): JSX.Element {
  const intitialSlideStyle: SlideStyle = {
    transform: `translateX(-100%)`,
    transition: `none`,
  };
  const slideEffectStyle = useRef<SlideStyle>(intitialSlideStyle);

  /**
   * @description
   */
  useEffect(() => {
    if (slide.loopSlide && state === STOP)
      slideEffectStyle.current = {
        transform: `translateX(${-(slide.new + 1) * 100}%)`,
        transition: 'none',
      };
  }, [slide, state]);
  /**
   * @description
   */
  useEffect(() => {
    const offsetSlide = () => {
      if (slide.new === 0 && slide.loopSlide) return -(slideContent.length + 1);
      if (slide.new === slideContent.length - 1 && slide.loopSlide) return slideContent.length - 1;
      return -1;
    };
    slideEffectStyle.current = {
      transform: `translateX(${(-slide.new + offsetSlide()) * 100}%)`,
      transition: `ease ${duration}ms`,
    };
  }, [duration, slideContent.length, slide]);

  const getSlide = (key: 'first' | 'last' | ProjectData) => {
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
        {slideContent.map((value, index) => (
          <a
            href={getSlide(value).address}
            key={`${index + 1}`}
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
