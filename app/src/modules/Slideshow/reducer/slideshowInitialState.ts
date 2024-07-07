import { SlideshowState } from '../types';
import { STOP } from '../utils/constants';

export const slideshowInitialState: SlideshowState = {
  current: 0,
  new: 0,
  loopSlide: false,
  slideTransition: STOP,
  maxIndexSlide: 0,
};
