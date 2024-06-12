import { useEffect, useRef } from 'react';

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

  return (
    <div className={style.picturesScroller}>
      <div className={style.picturesToScroll} style={slideEffectStyle.current}>
        <a
          href={slideContent[slideContent.length - 1].deliverables.find((item) => item.service === 'external')?.address}
          className={style.slide}
          aria-label={`Link to ${slideContent[slideContent.length - 1].title} website`}
        >
          <img className={style.picture} src={slideContent[slideContent.length - 1].picture} alt='' />
        </a>
        {slideContent.map((value, index) => (
          <a
            href={value.deliverables.find((item) => item.service === 'external')?.address}
            key={`${index + 1}`}
            className={style.slide}
            aria-label={`Link to ${value.title} website`}
          >
            <img className={style.picture} src={value.picture} alt='' />
          </a>
        ))}
        <a
          href={slideContent[0].deliverables.find((item) => item.service === 'external')?.address}
          className={style.slide}
          aria-label={`Link to ${slideContent[0].title} website`}
        >
          <img className={style.picture} src={slideContent[0].picture} alt='' />
        </a>
      </div>
    </div>
  );
}
