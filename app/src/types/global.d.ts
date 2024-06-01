import type { IconType } from '.';

// TODO: add comments
export type AccountLink = {
  id: number;
  service: string;
  icon: IconType;
  onPage?: boolean;
  address?: string;
  iv?: string;
};

export type SectionsRef = 'home' | 'work' | 'about' | 'services';

export type IndexPageSection = {
  id: string;
  anchor?: SectionsRef;
  type: 'hero' | 'section';
  catchPhrase?: { class: string; content: string };
  title: string;
};

export type SectionsMenu = {
  home: boolean;
  work: boolean;
  about: boolean;
  services: boolean;
};

export type VisibleSections = SectionsMenu | {};

// COMMENT: type of the layout context transmitted to the inserted pages
export type OutletContextPage = {
  outletContext: React.MutableRefObject<VisibleSections>;
};
