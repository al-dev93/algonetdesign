import { MutableRefObject } from 'react';

import type { DetailSection, SectionsRef, VisibleSections } from '@/types';

export type ShowcaseSectionProps = {
  content: DetailSection[];
  anchor?: SectionsRef;
  title?: string;
  visibleSections: MutableRefObject<VisibleSections>;
  openModalFormDialog?: () => void;
};
