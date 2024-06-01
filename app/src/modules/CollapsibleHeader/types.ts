import { SectionsRef, VisibleSections } from '@/types';

// COMMENT: type used for logo insertion
type ImageType = {
  src: string;
  alt: string;
};

// COMMENT: type used for the state of the collapsible header
export type CollapsibleHeaderState = 0 | -1 | 1;
// COMMENT: type of menu items
export type MenuType = {
  label: string;
  anchor: SectionsRef;
};
// COMMENT: type of propos for the MenuItem component
export type MenuItemProps = {
  isVisible?: boolean;
  label: string;
  anchor: SectionsRef;
};
// COMMENT: type of props for the CollapsibleHeader component
export type CollapsibleHeaderProps = {
  logo?: ImageType;
  menu?: MenuType[];
  visibleSections?: React.MutableRefObject<VisibleSections>;
  scrollWithMenuItem: React.MutableRefObject<number | undefined>;
};
