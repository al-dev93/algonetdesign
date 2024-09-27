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
  ContactFormInput,
  ContactFormModal,
  DialogFormInputElement,
  ErrorMessage,
  FormInput,
  SetStateBoolean,
  TooltipContent,
} from '@/types';

/**
 * this object specifies the props used by the ModalDialogContactForm component.
 *
 * @type {Object} ModalDialogContactFormProps
 * @property {boolean} open - state to manage the open/close status of the modale window
 * @property {SetStateBoolean} setOpen - function to set the open state of the modale window
 * @property {ContactFormModal} [data] - the data used to create the contact form modal.
 * Either `data` or `url` must be provided
 * @property {string | string[]} [url] - URL or array of URLs to fetch the data used to create the contact form modal.
 * Either `data` or `url` must be provided
 *
 * @al-dev93
 */
export type ModalDialogContactFormProps = {
  open: boolean;
  setOpen: SetStateBoolean;
} & ({ data: ContactFormModal; url?: never } | { data?: never; url: string | string[] });

/**
 * Represents the configuration object for the component DialogFormInput
 * used in the module ModalDialogContactForm
 *
 * @type {Object} DialogFormInputProps
 * @property {Dispatch<ModalDialogContactFormAction>} dispatch - the dispatch function
 * to handle actions related to the modal dialog contact form
 * @property {FormInput} input - the definition of thr input or textarea element of the form
 * @property {string} label - the label for the input element
 * @property {string} name - the nameattribute for the input element
 * @property {ModalDialogContactFormState} state - the current state of the modal dialog
 * contact form
 * @property {TooltipContent[]} [tooltipContent] - content for tooltips associated with
 * the input element (optional)
 *
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
 *
 * @type {Object} PopoverProps
 * @property {string[]} [autocompleteList] - List of autocomplete suggestions to display.
 * @property {ErrorMessage} [errorMessage] - Error messages associated with input validation.
 * @property {Validity} [errorState] - State representing input validity errors.
 * @property {boolean} [firstItemFocused] - Determines whether the first item in the list should be focused.
 * @property {(content: string) => void} inputAutocomplete - Callback function to handle input autocomplete.
 * @property {(DialogFormInputElement | null)} [prevFocusNode] - The previous input element to focus back to when necessary.
 *
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
 * @description
 *
 * @type {Object} AlertProps
 * @property {boolean} openAlert - A boolean that controls whether the alert modal is open.
 * @property {SetStateBoolean} setOpenAlert - A function to toggle the open/close state of the alert modal.
 * @property {(string | string[])} message - The message(s) to display in the alert. Can be a string or an array of strings.
 * @property {SetStateBoolean} [closeParentModal] - A function to close the parent modal, if necessary (optional).
 *
 * @al-dev93
 */
export type AlertProps = {
  closeParentModal?: SetStateBoolean;
  message: string | string[];
  openAlert: boolean;
  setOpenAlert: SetStateBoolean;
};

/**
 * Represents the form embedded in the contact modal window and the dialogue with the api.
 *
 * @type {Object} FormProps
 * @property {string} idForm - The form identifier in HTML.
 * @property {string} urlApi - URL allowing dialogue with the API.
 * @property {string} [urlFormContent] - URL to fetch the elements embedded in the FormContent component
 * (optional, used if dataFormContent is not used).
 * @property {ContactFormInput[]} [dataFormContent] - Data on elements embedded in the FormContent component
 * (optional,used if urlFormContent is not used).
 * @property {ModalDialogContactFormState} state - the current state of the modal dialog contact form.
 * @property {Dispatch<ModalDialogContactFormAction>} dispatch - the dispatch function to handle actions
 * related to the modal dialog contact form.
 * @property {SetStateBoolean} setOpenAlert - A function to toggle the open/close state of the alert modal.
 * @property {SetStateBoolean} onRenderComplete - Function to toggle the flag that tracks whether the
 * FormContent component is rendered.
 *
 * @al-dev93
 */
export type FormProps = {
  idForm: string;
  urlApi: string;
  state: ModalDialogContactFormState;
  dispatch: React.Dispatch<ModalDialogContactFormAction>;
  setOpenAlert: SetStateBoolean;
  onRenderComplete: SetStateBoolean;
} & (
  | { dataFormContent: ContactFormInput[]; urlFormContent?: never }
  | { dataFormContent?: never; urlFormContent: string }
);

/**
 * Represents the content of the form embedded in the contact modal window.
 *
 * @type {Object} FormContentProps
 * @property {string} [urlFormContent] - URL to fetch the elements embedded in the FormContent component
 * (optional, used if dataFormContent is not used)
 * @property {ContactFormInput[]} [dataFormContent] - Data on elements embedded in the FormContent component
 * (optional,used if urlFormContent is not used)
 * @property {ModalDialogContactFormState} state - the current state of the modal dialog contact form.
 * @property {Dispatch<ModalDialogContactFormAction>} dispatch - the dispatch function to handle actions
 * related to the modal dialog contact form.
 * @property {SetStateBoolean} onRenderComplete - Function to toggle the flag that tracks whether the
 * FormContent component is rendered.
 *
 * @al-dev93
 */
export type FormContentProps = Omit<FormProps, 'idForm' | 'urlApi' | 'setOpenAlert'>;

/**
 * Represents the possible overlay types of popover, either HISTORY or AUTOCOMPLETE
 *
 * @type {('HISTORY' | 'AUTOCOMPLETE')} OverlayType
 *
 * @al-dev93
 */
export type OverlayType = typeof HISTORY | typeof AUTOCOMPLETE;

/**
 * Represents a mapping of input names to their corresponding error messages
 *
 * @type {Object} InputErrorMessage
 * @property {Object.<string, ErrorMessage>} - a map where the key is a string
 * representing the input name and the value is an ErrorMessage object.
 *
 * @al-dev93
 */
export type InputErrorMessage = {
  [key: string]: ErrorMessage;
};

/**
 * Represents the validity state of the contact form field (input or textarea)
 *
 * @type {Object} Validity
 * @property {number} [minLength] - the minimum length required for the field (optional)
 * @property {boolean} [patternMismatch] - indicates if the value does not match
 * the specific pattern (optional)
 * @property {boolean} [tooShort] - indicates if the value is shorter than the required
 * minimum length (optional)
 * @property {boolean} valid - indicates if the field is valid
 * @property {boolean} [valueMissing] - indicates if the field is required
 * but not filled (optional)
 *
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
 * Represents the error status of an input field. This type can either be
 * 'remplir' (indicating the field needs to be filled) or 'modifier' (indicating the field needs to be modified).
 *
 * @type {('remplir' | 'modifier')} InputStatus
 *
 * @al-dev93
 */
export type InputStatus = 'remplir' | 'modifier';

/**
 * Represents the border style status of an input fields. This type can either be
 * 'edited' (indicating the input has been edited correctly) or 'error' (indicating the input contains an error)
 *
 * @type {('edited' | 'error')} InputBorderBox
 *
 * @al-dev93
 */
export type InputBorderBox = 'edited' | 'error';

/**
 * Represents the state of a contact form in a modal dialog.
 *
 * Each form field (represented by `name`) holds its own state object containing
 * validation, focus, input value, autocomplete options, and visual styling properties.
 *
 * @type {Object, <string, FieldState>} ModalDialogContactFormState
 * @property {Validity} [inputError] - Optional validation error for the input field, indicating its validity.
 * @property {boolean} isFocused - Indicates whether the input field is currently focused.
 * @property {InputStatus} [inputStatusTag] - Optional tag representing the current status of the input
 * field (e.g. `remplir`, `modifier`).
 * @property {InputBorderBox} [inputBorderBox] - Optional styling for the input field's border box.
 * @property {string} [inputValue] - The current value of the input field.
 * @property {string[]} [autoComplete] - Optional array of autocomplete suggestions for the input field.
 * @property {boolean} [overlayFirstItemFocus] - Indicates whether the first autocomplete suggestion is
 * currently focused.
 * @property {(string | null)} [applyAutoCompleteToInput] - The value to apply from the autocomplete suggestions,
 * or null if not applicable.
 *
 * @al-dev93
 */
export type ModalDialogContactFormState = {
  [name: string]: FieldState;
};

/**
 * Represents the state of an individual form field in the modal dialog contact form.
 *
 * @type {Object} FieldState
 * @property {Validity} [inputError] - Optional validation error for the input field, indicating its validity.
 * @property {boolean} isFocused - Indicates whether the input field is currently focused.
 * @property {InputStatus} [inputStatusTag] - Optional tag representing the current status of the input
 * field (e.g. `remplir`, `modifier`).
 * @property {InputBorderBox} [inputBorderBox] - Optional styling for the input field's border box.
 * @property {string} [inputValue] - The current value of the input field.
 * @property {string[]} [autoComplete] - Optional array of autocomplete suggestions for the input field.
 * @property {boolean} [overlayFirstItemFocus] - Indicates whether the first autocomplete suggestion is
 * currently focused.
 * @property {(string | null)} [applyAutoCompleteToInput] - The value to apply from the autocomplete suggestions,
 * or null if not applicable.
 *
 * @al-dev93
 */
type FieldState = {
  inputError?: Validity;
  isFocused: boolean;
  inputStatusTag?: InputStatus;
  inputBorderBox?: InputBorderBox;
  inputValue?: string;
  autoComplete?: string[];
  overlayFirstItemFocus?: boolean;
  applyAutoCompleteToInput?: string | null;
};

/**
 * Represents different actions related to the autocomplete functionality
 * in a form. Each action can have its own payload structure.
 *
 * @type {object} AutoComplete
 * @property {object} RESET_AUTO_COMPLETE_OVERLAY - Action to reset the auto-complete overlay.
 * @property {object} SET_AUTO_COMPLETE - Action to set auto-complete values for a specific input.
 * @property {object} SET_OVERLAY_FIRST_ITEM_FOCUS - Action to set the focus on the first item in the overlay.
 *
 * @type {object} ResetAutoCompleteOverlay
 * @property {string} name - The name of the input field for which the auto-complete overlay is reset.
 *
 * @type {object} SetAutoComplete
 * @property {string} name - The name of the input field for which auto-complete is being set.
 * @property {string[]} autoComplete - The list of auto-complete options for the input.
 *
 * @type {object} SetOverlayFirstItemFocus
 * @property {string} name - The name of the input field for which the focus is set.
 * @property {boolean} overlayFirstItemFocus - Indicates whether the first item in the overlay is focused.
 *
 * @al-dev93
 */
type AutoComplete =
  | {
      /**
       * Action to reset the auto-complete overlay.
       *
       * @property {string} name - The name of the input field for which the auto-complete overlay is reset.
       */
      type: typeof RESET_AUTO_COMPLETE_OVERLAY;
      payload: {
        name: string;
      };
    }
  | {
      /**
       * Action to set auto-complete values for a specific input.
       *
       * @property {string} name - The name of the input field.
       * @property {string[]} autoComplete - The list of auto-complete suggestions for the input.
       */
      type: typeof SET_AUTO_COMPLETE;
      payload: {
        name: string;
        autoComplete: string[];
      };
    }
  | {
      /**
       * Action to set the focus on the first item in the auto-complete overlay.
       *
       * @property {string} name - The name of the input field.
       * @property {boolean} overlayFirstItemFocus - Whether the first item in the overlay should be focused.
       */
      type: typeof SET_OVERLAY_FIRST_ITEM_FOCUS;
      payload: {
        name: string;
        overlayFirstItemFocus: boolean;
      };
    };

/**
 * Represents an action to manage the error tag component for a form input.
 *
 * @type {object} ErrorTagComponent
 * @property {object} SetErrorTag - Action to set an error tag for an input field.
 * @property {object} DeleteErrorTag - Action to delete the error tag for an input field.
 *
 * @type {object} SetErrorTag
 * @property {string} name - The name of the input field.
 * @property {InputStatus} errorTagName - The error tag to be applied to the input field.
 *
 * @type {object} DeleteErrorTag
 * @property {string} name - The name of the input field.
 * @property {undefined} errorTagName - There is no error tag when deleting it.
 *
 * @al-dev93
 */
export type ErrorTagComponent =
  | {
      /**
       * Action type for setting an error tag for the input.
       *
       * @property {string} name - The name of the input field.
       * @property {InputStatus} errorTagName - The error tag to be applied.
       */
      type: typeof DELETE_ERROR_TAG_NAME;
      payload: {
        name: string;
        errorTagName?: undefined;
      };
    }
  | {
      /**
       * Action type for deleting an error tag from the input
       *
       * @property {string} name - The name of the input field.
       * @property {undefined} errorTagName - There is no error tag to be applied.
       */
      type: typeof SET_ERROR_TAG_NAME;
      payload: {
        name: string;
        errorTagName?: InputStatus;
      };
    };

/**
 * Represents the action to initialize the dialog contact form state with a payload of strings.
 *
 * @type {object} InitDialogContactFormState
 * @property {string[]} payload - An array of strings representing the initial state for the dialog contact form.
 * @property {string} type - The action type for initializing the dialog contact form state.
 *
 * @al-dev93
 */
type InitDialogContactFormState = {
  type: typeof INIT_DIALOG_CONTACT_FORM_STATE;
  payload: string[];
};

/**
 * Union type representing actions related to form input component.
 * This includes actions for setting and deleting input errors, managing border styles,
 * and handling input focus and values.
 *
 * @type {object} InputComponent
 * @property {object} DeleteInputError - Action to delete an input error.
 * @property {object} SetInputError - Action to set an input error.
 * @property {object} DeleteInputValue - Action to delete the value of an input.
 * @property {object} SetInputBorderBox - Action to set the border style of an input.
 * @property {object} SetInputFocus - Action to update the focus state of an input.
 * @property {object} SetInputValue - Action to update the value of an input.
 *
 * @type {object} DeleteInputError
 * @property {string} name - The name of the input field.
 * @property {(Validity | undefined)} [inputError] - The validity of the input (optional).
 *
 * @type {object} SetInputError
 * @property {string} name - The name of the input field.
 * @property {(Validity | undefined)} inputError - The validity state of the input.
 *
 * @type {object} DeleteInputValue
 * @property {string} name - The name of the input field.
 *
 * @type {object} SetInputBorderBox
 * @property {string} name - The name of the input field.
 * @property {InputBorderBox} borderStyle - The style to apply to the input border.
 *
 * @type {object} SetInputFocus
 * @property {string} name - The name of the input field.
 * @property {boolean} isFocused - Whether the input is focused or not.
 *
 * @type {object} SetInputValue
 * @property {string} name - The name of the input field.
 * @property {string} inputValue - The value of the input field.
 *
 * @al-dev93
 */
export type InputComponent =
  | {
      /**
       * Action type to delete or set an input error.
       *
       * @property {string} name - The name of the input field.
       * @property {(Validity | undefined)} [inputError] - The validity state of the input (optional when deleting)
       */
      type: typeof DELETE_INPUT_ERROR | typeof SET_INPUT_ERROR;
      payload: {
        name: string;
        inputError?: Validity | undefined;
      };
    }
  | {
      /**
       * Action type to delete the value of an input.
       *
       * @property {string} name - The name of the input field.
       */
      type: typeof DELETE_INPUT_VALUE;
      payload: {
        name: string;
      };
    }
  | {
      /**
       * Action type to set the border style of an input field.
       *
       * @property {string} name - The name of the input field.
       * @property {InputBorderBox} borderStyle - The border style to apply.
       */
      type: typeof SET_INPUT_BORDER_BOX;
      payload: {
        name: string;
        borderStyle: InputBorderBox;
      };
    }
  | {
      /**
       * Action type to set the focus state of an input field.
       *
       * @property {string} name - The name of the input field.
       * @property {boolean} isFocused - Whether the input is focused.
       */
      type: typeof SET_INPUT_FOCUS;
      payload: {
        name: string;
        isFocused: boolean;
      };
    }
  | {
      /**
       * Action type to set the value of an input field.
       *
       * @property {string} name - The name of the input field.
       * @property {string} inputValue - The value to set for the input field.
       */
      type: typeof SET_INPUT_VALUE;
      payload: {
        name: string;
        inputValue: string;
      };
    };

/**
 * Union type representing all possible actions that can be dispatched in the
 * modal dialog contact form.
 *
 * This includes actions for:
 *   - Managing auto-complete functionality
 *   - Setting and deleting error tags
 *   - Initializing the dialog contact form state
 *   - Handling input-related actions such as setting error, border styles, focus, and value.
 *
 * @type {object} ModalDialogContactFormAction
 * @property {AutoComplete} AutoComplete - Represents actions related to auto-complete functionality.
 * @property {ErrorTagComponent} ErrorTagComponent - Represents actions for setting or deleting error tags.
 * @property {InitDialogContactFormState} InitDialogContactFormState - Represents the initialization of the contact form state.
 * @property {InputComponent} InputComponent - Represents actions related to input error handling, value, focus,
 * and border styling.
 *
 * @al-dev93
 */
export type ModalDialogContactFormAction =
  | AutoComplete
  | ErrorTagComponent
  | InitDialogContactFormState
  | InputComponent;
