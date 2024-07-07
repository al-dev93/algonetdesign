import { Dispatch } from 'react';

import {
  AUTOCOMPLETE,
  DELETE_ERROR_TAG_NAME,
  DELETE_INPUT_ERROR,
  DELETE_INPUT_VALUE,
  HISTORY,
  RESET_AUTO_COMPLETE_OVERLAY,
  SET_AUTO_COMPLETE,
  SET_ERROR_TAG_NAME,
  SET_INPUT_BORDER_BOX,
  SET_INPUT_ERROR,
  SET_INPUT_FOCUS,
  SET_INPUT_VALUE,
  SET_OVERLAY_FIRST_ITEM_FOCUS,
} from './utils/constants';

import type { ContactFormModal, ErrorMessage, FormInput, SetStateBoolean, TooltipContent } from '@/types';

export type ModalDialogContactFormProps = {
  open: boolean;
  setOpen: SetStateBoolean;
  data?: ContactFormModal;
  url?: string;
};

export type DialogFormInputProps = {
  name: string;
  label: string;
  input: FormInput;
  tooltipContent?: TooltipContent[];
  state: ModalDialogContactFormState;
  dispatch: Dispatch<ModalDialogContactFormAction>;
};

export type PopoverProps = {
  errorMessage?: string;
  fillList?: string[];
  firstItemFocused?: boolean;
  prevFocusNode?: HTMLInputElement | HTMLTextAreaElement | null;
  dispatch: Dispatch<ModalDialogContactFormAction>;
};

export type OverlayType = typeof HISTORY | typeof AUTOCOMPLETE;

export type InputErrorMessage = {
  [key: string]: ErrorMessage;
};

export type Validity = {
  valid: boolean;
  minLength?: number;
  patternMismatch?: boolean;
  valueMissing?: boolean;
  tooShort?: boolean;
};

type InputStatus = 'remplir' | 'modifier';
type InputBorderBox = 'isEdited' | 'isInError';

export type ModalDialogContactFormState = {
  [name: string]: {
    inputError?: Validity;
    isFocused: boolean;
    inputStatusTag?: InputStatus;
    inputBorderBox?: InputBorderBox;
    inputValue?: string;
    autoComplete?: string[];
    overlayFirstItemFocus?: boolean;
    applyAutoCompleteToInput?: string | null;
  };
};

type ChangeInputBorderBoxAction = {
  type: typeof SET_INPUT_BORDER_BOX;
  payload: {
    name: string;
    borderStyle: InputBorderBox;
  };
};

type ErrorTagName = {
  type: typeof SET_ERROR_TAG_NAME | typeof DELETE_ERROR_TAG_NAME;
  payload: {
    name: string;
    errorTagName?: InputStatus;
  };
};

type SetInputFocus = {
  type: typeof SET_INPUT_FOCUS;
  payload: {
    name: string;
    isFocused: boolean;
  };
};

type InputError = {
  type: typeof SET_INPUT_ERROR | typeof DELETE_INPUT_ERROR;
  payload: {
    name: string;
    inputError?: Validity | undefined;
  };
};

type AutoCompleteOverlay = {
  type: typeof SET_AUTO_COMPLETE | typeof SET_OVERLAY_FIRST_ITEM_FOCUS | typeof RESET_AUTO_COMPLETE_OVERLAY;
  payload: {
    name: string;
    autoComplete?: string[];
    overlayFirstItemFocus?: boolean;
  };
};

type InputValue = {
  type: typeof SET_INPUT_VALUE | typeof DELETE_INPUT_VALUE;
  payload: {
    name: string;
    inputValue?: string;
  };
};

export type ModalDialogContactFormAction =
  | ChangeInputBorderBoxAction
  | ErrorTagName
  | SetInputFocus
  | InputError
  | InputValue
  | AutoCompleteOverlay;
