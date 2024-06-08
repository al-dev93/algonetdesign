import { useEffect, useRef } from 'react';

import style from './style.module.css';
import { STOP } from '../../utils/constants';

import type { PicturesScrollerProps, SlideStyle } from '../../types';

/**
 * @description
 * @param param0
 * @returns
 */
export function PicturesScroller({ pictoLinkList, slide, state, duration = 600 }: PicturesScrollerProps): JSX.Element {
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
      if (slide.new === 0 && slide.loopSlide) return -(pictoLinkList.length + 1);
      if (slide.new === pictoLinkList.length - 1 && slide.loopSlide) return pictoLinkList.length - 1;
      return -1;
    };
    slideEffectStyle.current = {
      transform: `translateX(${(-slide.new + offsetSlide()) * 100}%)`,
      transition: `ease ${duration}ms`,
    };
  }, [duration, pictoLinkList.length, slide]);

  return (
    <div className={style.picturesScroller}>
      <div className={style.picturesToScroll} style={slideEffectStyle.current}>
        <a href={pictoLinkList[pictoLinkList.length - 1].link} className={style.slide} aria-label='gg'>
          <img className={style.picture} src={pictoLinkList[pictoLinkList.length - 1].picture} alt='' />
        </a>
        {pictoLinkList.map((value, index) => (
          <a href={value.link} key={`${index + 1}`} className={style.slide} aria-label='gg'>
            <img className={style.picture} src={value.picture} alt='' />
          </a>
        ))}
        <a href={pictoLinkList[0].link} className={style.slide} aria-label='gg'>
          <img className={style.picture} src={pictoLinkList[0].picture} alt='' />
        </a>
      </div>
    </div>
  );
}
