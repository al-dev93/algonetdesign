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
  autocompleteList?: string[];
  errorMessage?: ErrorMessage;
  errorState?: Validity;
  firstItemFocused?: boolean;
  inputAutocomplete: (content: string) => void;
  prevFocusNode?: HTMLInputElement | HTMLTextAreaElement | null;
  // url?: string;
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
export type InputBorderBox = 'isEdited' | 'isInError';

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

type InputComponent =
  | {
      type: typeof SET_INPUT_BORDER_BOX;
      payload: {
        name: string;
        borderStyle: InputBorderBox;
      };
    }
  | {
      type: typeof SET_INPUT_FOCUS;
      payload: {
        name: string;
        isFocused: boolean;
      };
    }
  | {
      type: typeof SET_INPUT_ERROR;
      payload: {
        name: string;
        inputError: Validity | undefined;
      };
    }
  | {
      type: typeof DELETE_INPUT_ERROR;
      payload: {
        name: string;
      };
    }
  | {
      type: typeof SET_INPUT_VALUE;
      payload: {
        name: string;
        inputValue: string;
      };
    }
  | {
      type: typeof DELETE_INPUT_VALUE;
      payload: {
        name: string;
      };
    };

type ErrorTagComponent =
  | {
      type: typeof SET_ERROR_TAG_NAME;
      payload: {
        name: string;
        errorTagName?: InputStatus;
      };
    }
  | {
      type: typeof DELETE_ERROR_TAG_NAME;
      payload: {
        name: string;
      };
    };

type AutoComplete =
  | {
      type: typeof SET_AUTO_COMPLETE;
      payload: {
        name: string;
        autoComplete: string[];
      };
    }
  | {
      type: typeof SET_OVERLAY_FIRST_ITEM_FOCUS;
      payload: {
        name: string;
        overlayFirstItemFocus: boolean;
      };
    }
  | {
      type: typeof RESET_AUTO_COMPLETE_OVERLAY;
      payload: {
        name: string;
      };
    };

export type ModalDialogContactFormAction = InputComponent | ErrorTagComponent | AutoComplete;
