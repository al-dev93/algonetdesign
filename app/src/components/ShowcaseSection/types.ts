import type { SectionsRef, VisibleSections } from '@/types';

export type CatchPhrase = {
  styleClass: string;
  content: string;
};

export type ShowcaseSectionProps = {
  anchor?: SectionsRef;
  type: 'hero' | 'section';
  catchPhrase?: CatchPhrase;
  title: string;
  visibleSections: React.MutableRefObject<VisibleSections>;
};
