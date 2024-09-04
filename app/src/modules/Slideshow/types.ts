import { Dispatch } from 'react';

import {
  CHANGE_SCROLLING_DOT,
  CHANGE_SLIDE,
  INIT_MAX_INDEX_SLIDE,
  NEXT_SLIDE,
  PENDING,
  PREVIOUS_SLIDE,
  SLIDE_TRANSITION,
  START,
  STOP,
} from './utils/constants';

import type { ProjectData } from '@/types';

export type SlideshowProps =
  | {
      data?: ProjectData[];
      url?: never;
    }
  | {
      data?: never;
      url?: string;
    };

export type SlideshowDotsProps = {
  slidesIndex: number[];
  slideshowDispatch: Dispatch<SlideshowAction>;
  slideshowState: SlideshowState;
};

export type ScrollButtonsProps = {
  slideshowDispatch: Dispatch<SlideshowAction>;
};

export type PicturesScrollerProps = {
  slideContent: ProjectData[];
  duration?: number;
  slideshowState: SlideshowState;
};

export type PicturesScrollerSlide = {
  address?: string;
  picture?: string;
  title: string;
};

export type FadeProps = {
  children: JSX.Element;
  state: SlideshowState;
  duration?: number;
};

export type SlideshowState = {
  current: number;
  new: number;
  loopSlide: boolean;
  slideTransition: SlideTransition;
  maxIndexSlide: number;
};

type SlideTransition = typeof START | typeof PENDING | typeof STOP;

export type SlideDirection = typeof NEXT_SLIDE | typeof PREVIOUS_SLIDE;

type ChangeSlideAction = {
  type: typeof CHANGE_SLIDE;
  payload: { direction: SlideDirection; transition: SlideTransition };
};

type ChangeScrollingDotAction = {
  type: typeof CHANGE_SCROLLING_DOT;
  payload: { dot: number; transition: SlideTransition };
};

type SlideTransitionAction = {
  type: typeof SLIDE_TRANSITION;
  payload: SlideTransition;
};

type InitMaxIndexSlideAction = {
  type: typeof INIT_MAX_INDEX_SLIDE;
  payload: { maxIndexSlide: number };
};

export type SlideshowAction =
  | ChangeScrollingDotAction
  | ChangeSlideAction
  | SlideTransitionAction
  | InitMaxIndexSlideAction;

export type SlideStyle =
  | {
      transform: string;
      transition: string;
    }
  | undefined;
