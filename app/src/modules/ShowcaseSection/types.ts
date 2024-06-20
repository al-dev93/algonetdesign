import type { DetailSection, SectionsRef, VisibleSections } from '@/types';

export type ShowcaseSectionProps = {
  content: DetailSection[];
  anchor?: SectionsRef;
  title?: string;
  visibleSections: React.MutableRefObject<VisibleSections>;
};
