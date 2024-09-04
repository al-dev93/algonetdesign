import { MutableRefObject } from 'react';

import type { DetailSection, SectionsRef, MenuSectionsVisibility } from '@/types';

/**
 * @description Props for the ShowcaseSection component.
 *
 * @type {object} ShowcaseSectionProps
 * @property {DetailSection[]} content - Data to produce the content of the section.
 * @property {SectionsRef} [anchor] - Name of the Id assigned to the section.
 * @property {string} [title] - Section title.
 * @property {MutableRefObject<MenuSectionsVisibility>} MenuSectionsVisibility - Indicates the name of the visible displayed.
 * @property {() => void} [openModalFormDialog] - Trigger for opening the contact modal to use button in the section.
 *
 * @al-dev93
 */
export type ShowcaseSectionProps = {
  content: DetailSection[];
  anchor?: SectionsRef;
  title?: string;
  MenuSectionsVisibility: MutableRefObject<MenuSectionsVisibility>;
  openModalFormDialog?: () => void;
};
