import IonIcon from '@reacticons/ionicons';
import { MouseEvent } from 'react';

import style from './style.module.css';
import { CHANGE_SLIDE, START } from '../../utils/constants';

import type { ScrollButtonsProps, SlideDirection } from '../../types';

/**
 *
 * @description //TODO: add comment
 * @export
 * @param {ScrollButtonsProps} { slideshowDispatch }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function ScrollButtons({ slideshowDispatch }: ScrollButtonsProps): JSX.Element {
  /**
   *
   * @description // TODO: add comment
   * @param {MouseEvent<HTMLDivElement, globalThis.MouseEvent>} e
   * @al-dev93
   */
  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>): void => {
    const target = e.currentTarget.attributes.getNamedItem('name')?.nodeValue as SlideDirection;
    slideshowDispatch({ type: CHANGE_SLIDE, payload: { direction: target, transition: START } });
  };

  return (
    <div className={style.scrollButtons}>
      <IonIcon
        className={style.scrollButton}
        name='chevron-back-outline'
        onClick={handleClick}
        aria-label='Previous slide'
        role='button'
      />
      <IonIcon
        className={style.scrollButton}
        name='chevron-forward-outline'
        onClick={handleClick}
        aria-label='Next slide'
        role='button'
      />
    </div>
  );
}
