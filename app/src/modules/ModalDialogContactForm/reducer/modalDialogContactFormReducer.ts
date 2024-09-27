import {
  DELETE_ERROR_TAG_NAME,
  DELETE_INPUT_ERROR,
  DELETE_INPUT_VALUE,
  INIT_DIALOG_CONTACT_FORM_STATE,
  RESET_AUTO_COMPLETE_OVERLAY,
  SET_AUTO_COMPLETE,
  SET_ERROR_TAG_NAME,
  SET_INPUT_BORDER_BOX,
  SET_INPUT_ERROR,
  SET_INPUT_FOCUS,
  SET_INPUT_VALUE,
  SET_OVERLAY_FIRST_ITEM_FOCUS,
} from '../utils/constants';
import {
  deleteErrorTagName,
  deleteInputError,
  deleteInputValue,
  initializeContactFormState,
  resetAutocompleteOverlay,
  setAutocomplete,
  setErrorTagName,
  setInputBorderBox,
  setInputError,
  setInputFocus,
  setInputValue,
  setOverlayFirstItemFocus,
} from '../utils/formStateHandlers';

import type { ModalDialogContactFormAction, ModalDialogContactFormState } from '../types';

/**
 * Reducer function for managing the state of the contact form in the modal dialog.
 * Handles actions such as initialization, input focus, error management, and auto-completion.
 *
 * @param {ModalDialogContactFormState} state - The current state of the contact form.
 * @param {ModalDialogContactFormAction} action - The action to perform on the state.
 * @returns {ModalDialogContactFormState} The updated state of the contact form.
 *
 * @al-dev93
 */
export function modalDialogContactFormReducer(
  state: ModalDialogContactFormState,
  action: ModalDialogContactFormAction,
): ModalDialogContactFormState {
  switch (action.type) {
    case INIT_DIALOG_CONTACT_FORM_STATE:
      return initializeContactFormState(action.payload);

    case SET_INPUT_BORDER_BOX:
      return setInputBorderBox(state, action.payload.name, action.payload.borderStyle);

    case SET_ERROR_TAG_NAME:
      return setErrorTagName(state, action.payload.name, action.payload.errorTagName);
    case DELETE_ERROR_TAG_NAME:
      return deleteErrorTagName(state, action.payload.name);

    case SET_INPUT_FOCUS:
      return setInputFocus(state, action.payload.name, action.payload.isFocused);

    case SET_INPUT_ERROR:
      return setInputError(state, action.payload.name, action.payload.inputError);

    case DELETE_INPUT_ERROR:
      return deleteInputError(state, action.payload.name);

    case SET_INPUT_VALUE:
      return setInputValue(state, action.payload.name, action.payload.inputValue);

    case DELETE_INPUT_VALUE:
      return deleteInputValue(state, action.payload.name);

    case SET_AUTO_COMPLETE:
      return setAutocomplete(state, action.payload.name, action.payload.autoComplete);

    case SET_OVERLAY_FIRST_ITEM_FOCUS:
      return setOverlayFirstItemFocus(state, action.payload.name, action.payload.overlayFirstItemFocus);

    case RESET_AUTO_COMPLETE_OVERLAY:
      return resetAutocompleteOverlay(state, action.payload.name);

    default:
      throw new Error(`Type d'action inconnu : ${(action as { type: string }).type}`);
  }
}
