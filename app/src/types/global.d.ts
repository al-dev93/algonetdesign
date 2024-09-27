import { Dispatch, MouseEventHandler, MutableRefObject, SetStateAction } from 'react';

import type { IconType } from '.';

export type StringObject = {
  readonly [key: string]: string;
};

/**
 * @description A function that updates the state of boolean value.
 * This is used specifically to control boolean state, such as opening/closing dialogs.
 *
 * @type {Dispatch<SetStateAction<boolean>>} SetStateBoolean
 */
export type SetStateBoolean = Dispatch<SetStateAction<boolean>>;

/**
 * @description Type used to handle mouse events on an HTML button element
 * (HTMLButtonElement)
 */
export type MouseEventButton = MouseEventHandler<HTMLButtonElement>;

/**
 * @description Type used for an event object representing a keyboard event bound
 * to an HTML button element and contains details about the keyboard interaction.
 */
export type KeyboardEventButton = KeyboardEvent<HTMLButtonElement>;

/**
 * @description Type used for an event object representing a keyboard event bound
 * to an HTML div element and contains details about the keyboard interaction.
 */
export type KeyboardEventDiv = KeyboardEvent<HTMLDivElement>;

/**
 * @description
 */
export type DialogFormElement = HTMLElement | HTMLInputElement | HTMLTextAreaElement;

/**
 * @description
 */
export type DialogFormInputElement = HTMLInputElement | HTMLTextAreaElement;

/**
 * @description on the main page as the layout
 */

/**
 * @description Represents the basic structure of a menu item.
 *
 * @type {object} MenuItemType
 * @property {string} id - The unique identifier for the menu item.
 * @property {string} label - The label or text displayed for the menu item.
 * @property {SectionsRef} anchor - A string reference to the section the menu item links to.
 *
 * @al-dev93
 */
export type MenuItemType = {
  id: string;
  label: string;
  anchor: SectionsRef;
};

/**
 * @description Type use to represent a link to a user account on an external service.
 */
export type AccountLink = {
  id: string;
  service: string;
  icon: IconType;
  onPage?: boolean;
  address?: string;
  iv?: string;
};

// NOTE: on the index page
/**
 * @description The type of tag to determine its style.
 */
export type TagType = 'alerted' | 'filled' | 'thinned';

/**
 * @description
 */
export type SectionsRef = 'home' | 'work' | 'about' | 'services';

/**
 * @description
 *
 * @type {object} IndexPageSection
 * @extends {Omit<MenuItemType, 'label'>}
 * @property {string} [title] -
 * @property {DetailSection[]} content -
 *
 * @al-dev93
 */
export type IndexPageSection = Omit<MenuItemType, 'label'> & { title?: string; content: DetailSection[] };

/**
 * @description Represents the context passed to the page sections from a React Router outlet.
 *
 * @type {object} OutletContextPage
 * @property {MutableRefObject<MenuSectionsVisibility>} viewSectionContext - A mutable reference to the current
 * visible sections of the page.
 * @property {SetStateBoolean} setOpenContactFormDialog - A function to toggle the state of the contact form dialog.
 *
 * @al-dev93
 */
export type OutletContextPage = {
  viewSectionContext: MutableRefObject<MenuSectionsVisibility>;
  setOpenContactFormDialog: SetStateBoolean;
};

/**
 * @description Represents the visibility state of multiple sections on the page and the active menu item(s)
 * because linked to the section(s).
 * The keys are  section names (strings) and the values are booleans indicating
 * whether each section is visible (`true`) or hidden (`false`).
 *
 * @type {Record<string, boolean>} MenuSectionsVisibility
 */
export type MenuSectionsVisibility = Record<string, boolean>;

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
  urlFormContent: string;
  urlApi: string;
  submitButtonName: string;
  title: string;
  subtitle: string;
  alertOnSubmit: string[];
};

type InputType = 'text' | 'email' | 'tel';
type InputTag = 'input' | 'textarea';

/**
 * @description Type of content to displayed in the tooltip including
 * text and line spacing size.
 */
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

export type ContactMessage = {
  id: string;
  name: string;
  company?: string;
  email: string;
  tel?: string;
  message: string;
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
  | MenuItemType[]
  | IndexPageSection[]
  | ProjectData[]
  | Skill[]
  | ContactFormInput[]
  | ContactFormModal[]
  | ErrorMessage[]
  | null;

export type FetchResultData = {
  data: FetchData | FetchData[];
  isLoaded: boolean;
  error: string | null;
  refetch: (url: string | undefined | null, options: FetchOptions) => Promise<void>;
  // setFetchOptionsData: (url: string | undefined | null, options?: object) => (() => void) | undefined;
};

/**
 * Options for the fetch request.
 */
export type FetchOptions = RequestInit;
