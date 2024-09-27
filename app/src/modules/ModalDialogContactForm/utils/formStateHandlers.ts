import { InputBorderBox, InputStatus, ModalDialogContactFormState, Validity } from '../types';

/**
 * Initializes the contact form state based on the provided list of input fields.
 * Each field is initialized with 'isFocused: false'.
 *
 * @param {string[]} inputs - List of input field names to initialize.
 * @returns {ModalDialogContactFormState} The updated state with initialized input fields.
 *
 * @al-dev93
 */
export function initializeContactFormState(inputs: string[]): ModalDialogContactFormState {
  return inputs.reduce((acc, input) => {
    if (input) {
      acc[input] = { isFocused: false };
    }
    return acc;
  }, {} as ModalDialogContactFormState);
}

/**
 * Updates the border style of a specific input field in the contact form.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {string} name - The name of the input field to update.
 * @param {InputBorderBox} borderStyle - The border style to apply to the input field.
 * @returns {ModalDialogContactFormState} The updated state with the new border syle applied.
 *
 * @al-dev93
 */
export function setInputBorderBox(
  state: ModalDialogContactFormState,
  name: string,
  borderStyle: InputBorderBox,
): ModalDialogContactFormState {
  return {
    ...state,
    [name]: { ...state[name], inputBorderBox: borderStyle },
  };
}

/**
 * Updates the error tag for a specific input field in the contact form.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {string} name - The name of the input field to update.
 * @param {(InputStatus | undefined)} errorTagName - The error tag to associate with the input field.
 * @returns {ModalDialogContactFormState} The updated state with the new error tag.
 *
 * @al-dev93
 */
export function setErrorTagName(
  state: ModalDialogContactFormState,
  name: string,
  errorTagName: InputStatus | undefined,
): ModalDialogContactFormState {
  return {
    ...state,
    [name]: { ...state[name], inputStatusTag: errorTagName },
  };
}

/**
 * Deletes the error tag for a specific input field in the contact form.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {string} name - The name of the input field to update.
 * @returns {ModalDialogContactFormState} The updated state with the error tag removed.
 *
 * @al-dev93
 */
export function deleteErrorTagName(state: ModalDialogContactFormState, name: string): ModalDialogContactFormState {
  const { [name]: inputStatusTag, ...rest } = state;
  return rest;
}

/**
 * Sets the focus state of a specific input field in the contact form.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {string} name - The name of the input field to update.
 * @param {boolean} isFocused - Indicates whether the input field is focused.
 * @returns {ModalDialogContactFormState} The updated state with the focus state set.
 *
 * @al-dev93
 */
export function setInputFocus(
  state: ModalDialogContactFormState,
  name: string,
  isFocused: boolean,
): ModalDialogContactFormState {
  return {
    ...state,
    [name]: { ...state[name], isFocused },
  };
}

/**
 * Updates the validity status for a specific input field in the contact form.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {string} name - The name of the input field to update.
 * @param {(Validity | undefined)} inputError - The validity status of the input field.
 * @returns {ModalDialogContactFormState} The updated state with the new validity status.
 *
 * @al-dev93
 */
export function setInputError(
  state: ModalDialogContactFormState,
  name: string,
  inputError: Validity | undefined,
): ModalDialogContactFormState {
  return {
    ...state,
    [name]: { ...state[name], inputError },
  };
}

/**
 * Deletes the validity status for a specific input field in the contact form.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {string} name - The name of the input field to update.
 * @returns {ModalDialogContactFormState} The updated state with the validity status removed.
 *
 * @al-dev93
 */
export function deleteInputError(state: ModalDialogContactFormState, name: string): ModalDialogContactFormState {
  const {
    [name]: { inputError, ...rest },
  } = state;
  return {
    ...state,
    [name]: { ...rest },
  };
}

/**
 * Sets the input value for a specific input field in the contact form.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {string} name - The name of the input field to update.
 * @param {string} inputValue - The new value to set for the input field.
 * @returns {ModalDialogContactFormState} The updated state with the input value set.
 *
 * @al-dev93
 */
export function setInputValue(
  state: ModalDialogContactFormState,
  name: string,
  inputValue: string,
): ModalDialogContactFormState {
  return {
    ...state,
    [name]: { ...state[name], inputValue },
  };
}

/**
 * Deletes the input value for a specific input field in the contact form.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {string} name - The name of the input field to update.
 * @returns {ModalDialogContactFormState} The updated state with the input value removed.
 *
 * @al-dev93
 */
export function deleteInputValue(state: ModalDialogContactFormState, name: string): ModalDialogContactFormState {
  const {
    [name]: { inputValue, ...rest },
  } = state;
  return {
    ...state,
    [name]: { ...rest },
  };
}

/**
 * Sets the autocomplete list for a specific input field in the contact form.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {string} name - The name of the input field to update.
 * @param {string[]} autoComplete - The new value of the autocompletion list for the input field.
 * @returns {ModalDialogContactFormState} The updated state with the autocomplete list set.
 *
 * @al-dev93
 */
export function setAutocomplete(
  state: ModalDialogContactFormState,
  name: string,
  autoComplete: string[],
): ModalDialogContactFormState {
  return {
    ...state,
    [name]: { ...state[name], autoComplete },
  };
}

/**
 * Sets the first item focused in autocomplete for a specific input field in the contact form.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {string} name - The name of the input field to update.
 * @param {boolean} overlayFirstItemFocus - Indicates the first item that should have focus in the autocompletion list.
 * @returns {ModalDialogContactFormState} The updated state with the first item focused in autocomplete set.
 *
 * @al-dev93
 */
export function setOverlayFirstItemFocus(
  state: ModalDialogContactFormState,
  name: string,
  overlayFirstItemFocus: boolean,
): ModalDialogContactFormState {
  return {
    ...state,
    [name]: { ...state[name], overlayFirstItemFocus },
  };
}

/**
 * Resets autocomplete window for a specific input field in the contact form.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {string} name - The name of the input field to update.
 * @returns {ModalDialogContactFormState} The updated state with the autocompletion reset.
 *
 * @al-dev93
 */
export function resetAutocompleteOverlay(
  state: ModalDialogContactFormState,
  name: string,
): ModalDialogContactFormState {
  const {
    [name]: { autoComplete, overlayFirstItemFocus, ...rest },
  } = state;
  return {
    ...state,
    [name]: { ...rest },
  };
}
