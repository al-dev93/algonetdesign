import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import type { IconType } from '.';

export type StringObject = {
  readonly [key: string]: string;
};

export type SetStateBoolean = Dispatch<SetStateAction<boolean>>;
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
  id: string;
  label: string;
  anchor: SectionsRef;
};

// TODO: add comments
export type AccountLink = {
  id: string;
  service: string;
  icon: IconType;
  onPage?: boolean;
  address?: string;
  iv?: string;
};

// COMMENT: type of the layout context transmitted to the inserted pages
export type OutletContextPage = {
  viewSectionContext: MutableRefObject<VisibleSections>;
  setOpenContactFormDialog: SetStateBoolean;
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
  wrapped?: boolean;
  name?: string;
  content?: string;
  urlContent?: string;
  boldContent?: DetailSection[];
};

// TODO add comments

/**
 * @description
 * @type
 * @export
 * @al-dev93
 */
export type Deliverable = {
  id: string;
  service: string;
  icon: IconType;
  address: string;
  path?: string;
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

export type Skill = {
  id: string;
  text: string;
  value: number;
};

// NOTE: data for the contact form

export type ContactFormModal = {
  id: string;
  url: string;
  submitButtonName: string;
  title: string;
  subtitle: string;
  alertOnSubmit: string[];
};

type InputType = 'text' | 'email' | 'tel';
type InputTag = 'input' | 'textarea';

export type TooltipContent = {
  id: string;
  line: string;
  lineHeight?: number;
};

export type ErrorMessage = {
  id: string;
  patternMismatch?: string;
  tooShort?: string;
  valueMissing?: string;
};

export type FormInput = {
  id: string;
  tag: InputTag;
  type?: InputType;
  placeholder: string;
  pattern?: string;
  required?: boolean;
  minLength?: number;
  error?: ErrorMessage;
};

export type ContactFormInput = {
  id: string;
  label: string;
  input: FormInput;
  tooltipContent?: string | TooltipContent | TooltipContent[];
};

// NOTE: data fetched via the useFetchData hook

// TODO: add comment
/**
 * @description
 * @type
 * @export
 * @al-dev93
 */
export type FetchData =
  | AccountLink[]
  | MenuType[]
  | IndexPageSection[]
  | ProjectData[]
  | Skill[]
  | ContactFormInput[]
  | ContactFormModal[]
  | ErrorMessage[]
  | null;

export type FetchResultData = {
  data: FetchData;
  isLoaded: boolean;
  error: string | null;
};
