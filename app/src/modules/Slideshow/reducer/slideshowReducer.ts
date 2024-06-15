import {
  CHANGE_SCROLLING_DOT,
  CHANGE_SLIDE,
  INIT_MAX_INDEX_SLIDE,
  NEXT_SLIDE,
  SLIDE_TRANSITION,
} from '../utils/constants';

import type { SlideshowAction, SlideshowState } from '../types';

/**
 *
 * @description // TODO: add comment
 * @export
 * @param {SlideshowState} state
 * @param {SlideshowAction} action
 * @return {*}  {SlideshowState}
 */
export function slideshowReducer(state: SlideshowState, action: SlideshowAction): SlideshowState {
  switch (action.type) {
    case CHANGE_SLIDE:
      return action.payload.direction === NEXT_SLIDE
        ? {
            ...state,
            loopSlide: state.new === state.maxIndexSlide,
            current: state.new,
            new: state.new === state.maxIndexSlide ? 0 : state.new + 1,
            slideTransition: action.payload.transition,
          }
        : {
            ...state,
            loopSlide: state.new === 0,
            current: state.new,
            new: state.new === 0 ? state.maxIndexSlide : state.new - 1,
            slideTransition: action.payload.transition,
          };
    case CHANGE_SCROLLING_DOT:
      return {
        ...state,
        current: state.new,
        new: action.payload.dot,
        loopSlide: Math.abs(action.payload.dot - state.new) === state.maxIndexSlide,
        slideTransition: action.payload.transition,
      };
    case SLIDE_TRANSITION:
      return { ...state, slideTransition: action.payload };
    case INIT_MAX_INDEX_SLIDE:
      return { ...state, maxIndexSlide: action.payload.maxIndexSlide };
    default:
      throw Error(`Action inconnue : ${(action as { type: string }).type}`);
  }
}
