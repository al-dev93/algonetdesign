import React from 'react';

import style from './style.module.css';
import { CHANGE_SCROLLING_DOT, START } from '../../utils/constants';

import type { SlideshowDotsProps } from '../../types';

/**
 *
 * @description // TODO: add comment
 * @export
 * @param {SlideshowDotsProps} { slidesIndex, slideshowDispatch, slideshowState }
 * @return {React.JSX.Element}
 * @al-dev93
 */
export function SlideshowDots({
  slidesIndex,
  slideshowDispatch,
  slideshowState,
}: SlideshowDotsProps): React.JSX.Element {
  /**
   * @description // TODO: add comment
   * @callback
   * @param {number} value
   * @al-dev93
   */
  const handleClick = (value: number): void => {
    slideshowDispatch({ type: CHANGE_SCROLLING_DOT, payload: { dot: value, transition: START } });
  };

  return (
    <div className={style.slideshowDots}>
      {slidesIndex.map((value) => (
        <div
          key={value}
          className={`${style.dot} ${slideshowState.new === value ? style.active : style.notActive}`}
          onClick={() => handleClick(value)}
          role='presentation'
        />
      ))}
    </div>
  );
}
