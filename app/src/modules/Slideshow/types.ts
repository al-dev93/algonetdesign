import { ProjectData } from '@/types';

export type SlideshowProps = {
  projectData: ProjectData[];
  url: string;
};

export type SlideshowDotsProps = {
  slidesIndex: number[];
  active: number;
  setSlide: React.Dispatch<React.SetStateAction<Slide>>;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

export type ScrollButtonsProps = {
  slide: Slide;
  setSlide: React.Dispatch<React.SetStateAction<Slide>>;
  setState: React.Dispatch<React.SetStateAction<State>>;
  maxIndex: number;
};

export type PicturesScrollerProps = {
  pictoLinkList: { link: string | undefined; picture: string }[];
  slide: Slide;
  duration?: number;
  state: State;
};

export type FadeProps = {
  children: JSX.Element;
  state: State;
  slide: Slide;
  duration?: number;
};

export type State = 1 | 2 | 3;

export type Slide = {
  current: number;
  new: number;
  loopSlide: boolean;
};

export type SlideStyle =
  | {
      transform: string;
      transition: string;
    }
  | undefined;
