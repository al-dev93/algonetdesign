// COMMENT: type used for the state of the collapsible header
export type CollapsibleHeaderState = 0 | -1 | 1;
// COMMENT: type
export type OnSectionPage = {
  onHome: boolean;
  onWork: boolean;
  onAbout: boolean;
  onServices: boolean;
};
// COMMENT: type
export type OutletContextPage = {
  setOutletContext: React.Dispatch<React.SetStateAction<OnSectionPage | undefined>>;
};
