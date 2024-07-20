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

import type { ModalDialogContactFormAction, ModalDialogContactFormState } from '../types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {ModalDialogContactFormState} state
 * @param {ModalDialogContactFormAction} action
 * @return {*}  {ModalDialogContactFormState}
 * @al-dev93
 */
export function modalDialogContactFormReducer(
  state: ModalDialogContactFormState,
  action: ModalDialogContactFormAction,
): ModalDialogContactFormState {
  switch (action.type) {
    case INIT_DIALOG_CONTACT_FORM_STATE:
      return action.payload.reduce((acc: object, input: string) => {
        return input ? { ...acc, [input]: { isFocused: false } } : {};
      }, {});
    case SET_INPUT_BORDER_BOX:
      return {
        ...state,
        [action.payload.name]: { ...state[action.payload.name], inputBorderBox: action.payload.borderStyle },
      };
    case SET_ERROR_TAG_NAME:
      return {
        ...state,
        [action.payload.name]: { ...state[action.payload.name], inputStatusTag: action.payload.errorTagName },
      };
    case DELETE_ERROR_TAG_NAME: {
      const {
        [action.payload.name]: { inputStatusTag, ...newObject },
      } = state;
      return { ...state, [action.payload.name]: { ...newObject } };
    }
    case SET_INPUT_FOCUS:
      return {
        ...state,
        [action.payload.name]: { ...state[action.payload.name], isFocused: action.payload.isFocused },
      };
    case SET_INPUT_ERROR:
      return {
        ...state,
        [action.payload.name]: { ...state[action.payload.name], inputError: action.payload.inputError },
      };
    case DELETE_INPUT_ERROR: {
      const {
        [action.payload.name]: { inputError, ...newObject },
      } = state;
      return { ...state, [action.payload.name]: { ...newObject } };
    }
    case SET_INPUT_VALUE:
      return {
        ...state,
        [action.payload.name]: { ...state[action.payload.name], inputValue: action.payload.inputValue },
      };
    case DELETE_INPUT_VALUE: {
      const {
        [action.payload.name]: { inputValue, ...newObject },
      } = state;
      return { ...state, [action.payload.name]: { ...newObject } };
    }
    case SET_AUTO_COMPLETE:
      return {
        ...state,
        [action.payload.name]: { ...state[action.payload.name], autoComplete: action.payload.autoComplete },
      };
    case SET_OVERLAY_FIRST_ITEM_FOCUS:
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          overlayFirstItemFocus: action.payload.overlayFirstItemFocus,
        },
      };
    case RESET_AUTO_COMPLETE_OVERLAY: {
      const {
        [action.payload.name]: { autoComplete, overlayFirstItemFocus, ...newObject },
      } = state;
      return {
        ...state,
        [action.payload.name]: { ...newObject },
      };
    }

    default:
      throw Error(`Action inconnue : ${(action as { type: string }).type}`);
  }
}
