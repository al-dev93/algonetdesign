import { Dispatch } from 'react';

import {
  AUTOCOMPLETE,
  DELETE_ERROR_TAG_NAME,
  DELETE_INPUT_ERROR,
  DELETE_INPUT_VALUE,
  HISTORY,
  INIT_DIALOG_CONTACT_FORM_STATE,
  RESET_AUTO_COMPLETE_OVERLAY,
  SET_AUTO_COMPLETE,
  SET_ERROR_TAG_NAME,
  SET_INPUT_BORDER_BOX,
  SET_INPUT_ERROR,
  SET_INPUT_FOCUS,
  SET_INPUT_VALUE,
  SET_OVERLAY_FIRST_ITEM_FOCUS,
} from './utils/constants';

import type {
  ContactFormModal,
  DialogFormInputElement,
  ErrorMessage,
  FormInput,
  SetStateBoolean,
  TooltipContent,
} from '@/types';
/**
 * Represents the configuration object for the component module ModalDialogContactForm
 * @typedef {Object} ModalDialogContactFormProps
 * @property {boolean} open - state to manage the open/close status of the modale window
 * @property {SetStateBoolean} setOpen - function to set the open state of the modale window
 * @property {ContactFormModal} [data] - the data used to create the contact form modal.
 * Either `data` or `url` must be provided
 * @property {string} [url] - URL to fetch the data used to create the contact form modal.
 * Either `data` or `url` must be provided
 * @description this object specifies the props used by the ModalDialogContactForm component.
 * It includes optional data for pre-
 * @exports ModalDialogContactFormProps
 * @al-dev93
 */
export type ModalDialogContactFormProps = {
  open: boolean;
  setOpen: SetStateBoolean;
} & ({ data: ContactFormModal; url?: never } | { data?: never; url: string });
/**
 *
 * Represents the configuration object for the component DialogFormInput
 * used in the module ModalDialogContactForm
 *
 * @typedef {Object} DialogFormInputProps
 * @property {Dispatch<ModalDialogContactFormAction>} dispatch - the dispatch function
 * to handle actions related to the modal dialog contact form
 * @property {FormInput} input - the definition of thr input or textarea element of the form
 * @property {string} label - the label for the input element
 * @property {string} name - the nameattribute for the input element
 * @property {ModalDialogContactFormState} state - the current state of the modal dialog
 * contact form
 * @property {TooltipContent[]} [tooltipContent] - content for tooltips associated with
 * the input element (optional)
 * @exports DialogFormInputProps
 * @al-dev93
 */
export type DialogFormInputProps = {
  dispatch: Dispatch<ModalDialogContactFormAction>;
  input: FormInput;
  label: string;
  name: string;
  state: ModalDialogContactFormState;
  tooltipContent?: TooltipContent[];
};
/**
 * Represents the configuration object for the component Popover
 * used in the module ModalDialogContactForm
 * @typedef {Object} PopoverProps
 * @property {string[]} [autocompleteList] // TODO: add comment (optional)
 * @property {ErrorMessage} [errorMessage] // TODO: add comment (optional)
 * @property {Validity} [errorState] // TODO: add comment (optional)
 * @property {boolean} [firstItemFocused] // TODO: add comment (optional)
 * @property {}
 * @property {(DialogFormInputElement | null)}
 * @description // TODO: add comment
 * @exports PopoverProps
 * @al-dev93
 */
export type PopoverProps = {
  autocompleteList?: string[];
  errorMessage?: ErrorMessage;
  errorState?: Validity;
  firstItemFocused?: boolean;
  inputAutocomplete: (content: string) => void;
  prevFocusNode?: DialogFormInputElement | null;
};
/**
 *
 * @typedef {Object} AlertProps
 * @property {SetStateBoolean} [closeParentModal] - // TODO: add comment
 * @property {(string | string[])} message - // TODO: add comment
 * @property {ModalState} openAlert - // TODO: add comment
 * @property {Dispatch<SetStateAction<ModalState>>} setOpenAlert - // TODO: add comment
 * @exports AlertProps
 * @al-dev93
 */
export type AlertProps = {
  closeParentModal?: SetStateBoolean;
  message: string | string[];
  openAlert: boolean;
  setOpenAlert: SetStateBoolean;
};
/**
 *
 * Represents the possible overlay types of popover, either HISTORY or AUTOCOMPLETE
 * @typedef {('HISTORY' | 'AUTOCOMPLETE')} OverlayType
 * @description // TODO: add comment
 * @exports OverlayType
 * @al-dev93
 */
export type OverlayType = typeof HISTORY | typeof AUTOCOMPLETE;
/**
 *
 * Represents a mapping of input names to their corresponding error messages
 * @typedef {Object} InputErrorMessage
 * @property {Object.<string, ErrorMessage>} - a map where the key is a string
 * representing the input name and the value is an ErrorMessage object.
 * @exports InputErrorMessage
 * @al-dev93
 */
export type InputErrorMessage = {
  [key: string]: ErrorMessage;
};
/**
 *
 * Represents the validity state of the contact form field (input or textarea)
 * @typedef {Object} Validity
 * @property {number} [minLength] - the minimum length required for the field (optional)
 * @property {boolean} [patternMismatch] - indicates if the value does not match
 * the specific pattern (optional)
 * @property {boolean} [tooShort] - indicates if the value is shorter than the required
 * minimum length (optional)
 * @property {boolean} valid - indicates if the field is valid
 * @property {boolean} [valueMissing] - indicates if the field is required
 * but not filled (optional)
 * @exports Validity
 * @al-dev93
 */
export type Validity = {
  minLength?: number;
  patternMismatch?: boolean;
  tooShort?: boolean;
  valid: boolean;
  valueMissing?: boolean;
};
/**
 *
 * Represents the error status of an input field.
 *
 * This type can either be 'remplir' (indicating the field needs to be filled)
 * or 'modifier' (indicating the field needs to be modified).
 *
 * @typedef {'remplir' | 'modifier'} InputStatus
 * @al-dev93
 */
type InputStatus = 'remplir' | 'modifier';
/**
 *
 * Represents the border style status of an input fields.
 *
 * This type can either be 'isEdited' (indicating the input has been edited correctly)
 * or 'isInError' (indicating the input contains an error)
 *
 * @typedef {'isEdited' | 'isInError'} InputBorderBox
 * @exports
 * @al-dev93
 */
export type InputBorderBox = 'isEdited' | 'isInError';
/**
 *
 */
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

type AutoComplete =
  | {
      type: typeof RESET_AUTO_COMPLETE_OVERLAY;
      payload: {
        name: string;
      };
    }
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
    };

type ErrorTagComponent =
  | {
      type: typeof DELETE_ERROR_TAG_NAME;
      payload: {
        name: string;
      };
    }
  | {
      type: typeof SET_ERROR_TAG_NAME;
      payload: {
        name: string;
        errorTagName?: InputStatus;
      };
    };
type InitDialogContactFormState = {
  type: typeof INIT_DIALOG_CONTACT_FORM_STATE;
  payload: string[];
};

type InputComponent =
  | {
      type: typeof DELETE_INPUT_ERROR;
      payload: {
        name: string;
      };
    }
  | {
      type: typeof DELETE_INPUT_VALUE;
      payload: {
        name: string;
      };
    }
  | {
      type: typeof SET_INPUT_BORDER_BOX;
      payload: {
        name: string;
        borderStyle: InputBorderBox;
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
      type: typeof SET_INPUT_FOCUS;
      payload: {
        name: string;
        isFocused: boolean;
      };
    }
  | {
      type: typeof SET_INPUT_VALUE;
      payload: {
        name: string;
        inputValue: string;
      };
    };

export type ModalDialogContactFormAction =
  | AutoComplete
  | ErrorTagComponent
  | InitDialogContactFormState
  | InputComponent;
