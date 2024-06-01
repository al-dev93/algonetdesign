import { SectionsRef, VisibleSections } from '@/types';

export type CatchPhrase = {
  class: string;
  content: string;
};

export type ShowcaseSectionProps = {
  anchor?: SectionsRef;
  type: 'hero' | 'section';
  catchPhrase?: CatchPhrase;
  title: string;
  visibleSections: React.MutableRefObject<VisibleSections>;
};
