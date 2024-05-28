// // COMMENT: type used for the state of the collapsible header
// export type CollapsibleHeaderState = 0 | -1 | 1;
// COMMENT: state type used to store the result of the useOnScreen hook
//  in the layout state
// export type OnSectionPage = {
//   onHome: boolean;
//   onWork: boolean;
//   onAbout: boolean;
//   onServices: boolean;
// };
export type OnSectionView = string[];
// COMMENT: type of the layout context transmitted to the inserted pages
export type OutletContextPage = {
  outletContext: React.MutableRefObject<OnSectionView | undefined>;
  // setOutletContext: React.Dispatch<React.SetStateAction<OnSectionPage | undefined>>;
};
