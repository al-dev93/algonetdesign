// COMMENT: type
type ImageType = {
  src: string;
  alt: string;
};

// COMMENT: type used for the state of the collapsible header
export type CollapsibleHeaderState = 0 | -1 | 1;
// COMMENT: type
export type MenuItemProps = {
  onView?: boolean;
  label: string;
  anchor: string;
};
// COMMENT: type
export type MenuType = {
  label: string;
  anchor: string;
};
// COMMENT: type
export type CollapsibleHeaderProps = {
  logo?: ImageType;
  menu?: MenuType[];
  onViewMap?: React.MutableRefObject<string[] | undefined>;
  scrollWithOption: React.MutableRefObject<number | undefined>;
};
