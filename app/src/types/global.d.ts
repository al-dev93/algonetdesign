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

// COMMENT: type of menu items
export type MenuType = {
  label: string;
  anchor: SectionsRef;
};

// COMMENT: type of the layout context transmitted to the inserted pages
export type OutletContextPage = {
  outletContext: React.MutableRefObject<VisibleSections>;
};

export type SectionsRef = 'home' | 'work' | 'about' | 'services';

export type IndexPageSection = {
  id: string;
  anchor?: SectionsRef;
  title?: string;
  content: DetailSection[];
};

export type SectionsMenu = {
  home: boolean;
  work: boolean;
  about: boolean;
  services: boolean;
};

export type VisibleSections = SectionsMenu | object;

export type DetailSection = {
  id: string;
  tag: string;
  name?: string;
  content?: string;
};

// TODO: add comment
export type FetchData = AccountLink[] | MenuType[] | IndexPageSection[] | null;

export type FetchResultData = {
  data: FetchData;
  isLoaded: boolean;
  error: string | null;
};
