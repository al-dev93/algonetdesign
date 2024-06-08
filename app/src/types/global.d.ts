import type { IconType } from '.';

/**
 * @description on the main page as the layout
 */

// TODO: add comments

export type SectionsMenu = {
  home: boolean;
  work: boolean;
  about: boolean;
  services: boolean;
};
/**
 * @description type of menu items
 */
export type MenuType = {
  label: string;
  anchor: SectionsRef;
};

// TODO: add comments
export type AccountLink = {
  id: number;
  service: string;
  icon: IconType;
  onPage?: boolean;
  address?: string;
  iv?: string;
};

// COMMENT: type of the layout context transmitted to the inserted pages
export type OutletContextPage = {
  outletContext: React.MutableRefObject<VisibleSections>;
};

// NOTE: on the index page

export type TagType = 'row' | 'wrapp' | 'table' | 'error';

export type SectionsRef = 'home' | 'work' | 'about' | 'services';

export type IndexPageSection = {
  id: string;
  anchor?: SectionsRef;
  title?: string;
  content: DetailSection[];
};

export type VisibleSections = SectionsMenu | object;

export type DetailSection = {
  id: string;
  tag: string;
  name?: string;
  content?: string;
};

// TODO add comments

/**
 * @description
 * @type
 * @export
 * @al-dev93
 */
export type Deliverable = {
  service: string;
  address: string;
};
/**
 * @description
 * @type
 * @al-dev93
 */
type DisplayMode = 'slideshow' | 'card';
/**
 * @description
 * @type
 * @export
 * @al-dev93
 */
export type ProjectData = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  picture?: string;
  display?: DisplayMode;
  deliverables: Deliverable[];
};

// TODO: add comment
/**
 * @description
 * @type
 * @export
 * @al-dev93
 */
export type FetchData = AccountLink[] | MenuType[] | IndexPageSection[] | ProjectData[] | null;

export type FetchResultData = {
  data: FetchData;
  isLoaded: boolean;
  error: string | null;
};
