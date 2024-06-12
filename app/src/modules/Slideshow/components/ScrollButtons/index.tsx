import IonIcon from '@reacticons/ionicons';

import style from './style.module.css';
import { START } from '../../utils/constants';

import type { ScrollButtonsProps } from '../../types';

/**
 *
 * @description //TODO: add comment
 * @export
 * @param {ScrollButtonsProps} { slide, setSlide, setState, maxIndex }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function ScrollButtons({ slide, setSlide, setState, maxIndex }: ScrollButtonsProps): JSX.Element {
  /**
   * @description
   * @param e
   * @returns
   */
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setState(START);
    const target = e.currentTarget.attributes.getNamedItem('name')?.nodeValue;
    const onLoop =
      (slide.new === maxIndex && target === 'chevron-forward-outline') ||
      (slide.new === 0 && target === 'chevron-back-outline');

    if (slide.new >= 0 && slide.new <= maxIndex && !onLoop) {
      setSlide((prev) => ({
        loopSlide: false,
        current: prev.new,
        new: prev.new + (target === 'chevron-forward-outline' ? 1 : -1),
      }));
      return;
    }
    setSlide((prev) => ({
      loopSlide: onLoop,
      current: prev.new,
      new: slide.new === 0 ? maxIndex : 0,
    }));
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
