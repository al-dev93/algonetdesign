import { Dispatch, RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react';

import { addToLocalStorage, getAutocompleteInput, saveToLocalStorage } from '../utils/autocompleteStorageUtils';
import {
  AUTOCOMPLETE,
  DELETE_INPUT_ERROR,
  HISTORY,
  RESET_AUTO_COMPLETE_OVERLAY,
  SET_AUTO_COMPLETE,
  SET_INPUT_ERROR,
  SET_INPUT_FOCUS,
  SET_INPUT_VALUE,
  SET_OVERLAY_FIRST_ITEM_FOCUS,
} from '../utils/constants';
import { formatInputNumber } from '../utils/formHelpers';
import { getInputValidityProperties, setInputBorderBox, setInputErrorTag } from '../utils/inputErrorHandler';

import type { ModalDialogContactFormAction, OverlayType } from '../types';
import type { DialogFormInputElement } from '@/types';

/**
 * @description Custom hook that manages the state and behavior of a contact form input field.
 * This includes validation, error handling, auto-complete, and storage management.
 *
 * @param {(RefObject<DialogFormInputElement>)} inputRef - Reference to the input element.
 * @param {Dispatch<ModalDialogContactFormAction>} dispatch - Dispatch function to update the form state.
 * @returns {[(content: string) => void]} A function to set the input value from auto-complete.
 */
export function useContactForm(
  inputRef: RefObject<DialogFormInputElement>,
  dispatch: Dispatch<ModalDialogContactFormAction>,
): [(content: string) => void] {
  const stateRef = useRef<{ isStored: boolean; overlay: OverlayType | undefined }>({
    isStored: false,
    overlay: undefined as OverlayType | undefined,
  });
  const [isInputFilled, setIsInputFilled] = useState<boolean>(false);

  /**
   * @description Edits the form input, updating the border, error tag, and error state.
   *
   * @param {DialogFormInputElement} input - The active input field to edit.
   * @param {boolean} [isAutocompleted = false] - Allows for differentiated handling in the case of an auto-completed value.
   * @returns {boolean} Whether the input is valid.
   *
   * @al-dev93
   */
  const editFormInput = useCallback(
    (input: DialogFormInputElement, isAutocompleted: boolean = false): boolean => {
      const { required, name } = input;
      // const inputValidity = updateErrorState(input, isAutocompleted);
      const inputValidity = getInputValidityProperties(input, isAutocompleted);

      dispatch({
        type: inputValidity.valid ? DELETE_INPUT_ERROR : SET_INPUT_ERROR,
        payload: { name, inputError: inputValidity },
      });

      if (required) dispatch(setInputErrorTag(input, inputValidity));
      dispatch(setInputBorderBox(input, inputValidity));

      return inputValidity.valid;
    },
    [dispatch],
  );

  /**
   * @description handles keyboard events such as 'ArrowDown' and 'ArrowUp'.
   *
   * @param {(KeyboardEvent)} event - The keyboard event object.
   *
   * @al-dev93
   */
  const handleKeyboardEvent = useCallback(
    (event: KeyboardEvent): void => {
      const input = inputRef.current;
      if (!input) return;

      const { name } = input;
      const autoComplete = getAutocompleteInput(input, stateRef.current.isStored);

      if (['ArrowDown', 'ArrowUp'].includes(event.code)) {
        const overlayFirstItemFocus = event.code === 'ArrowDown';
        if (stateRef.current.overlay !== AUTOCOMPLETE) {
          stateRef.current.overlay = HISTORY;
          if (autoComplete) dispatch({ type: SET_AUTO_COMPLETE, payload: { name, autoComplete } });
        }
        dispatch({
          type: SET_OVERLAY_FIRST_ITEM_FOCUS,
          payload: { name, overlayFirstItemFocus },
        });
      }
    },
    [dispatch, inputRef],
  );

  /**
   * @description Handles input events such as 'input', 'change', 'keydown', and 'focus'.
   *
   * @param {(Event)} event - The event object.
   *
   * @al-dev93
   */
  const handleInputEvent = useCallback(
    (event: Event): void => {
      const input = inputRef.current;
      if (!input) return;

      const { name, type, value: inputValue } = input;
      const error = !input.validity.valid;

      switch (event.type) {
        case 'input':
          {
            if (type === 'tel') input.value = formatInputNumber(inputValue);
            editFormInput(input);
            const autoComplete = getAutocompleteInput(input, stateRef.current.isStored, true);
            stateRef.current.overlay = AUTOCOMPLETE;
            if (autoComplete) dispatch({ type: SET_AUTO_COMPLETE, payload: { name, autoComplete } });
          }
          break;
        case 'change':
          if (!error) dispatch({ type: SET_INPUT_VALUE, payload: { name, inputValue } });
          setIsInputFilled((current) => !current);
          break;
        case 'keydown':
          if (event instanceof KeyboardEvent) handleKeyboardEvent(event);
          break;
        case 'focus':
          dispatch({ type: RESET_AUTO_COMPLETE_OVERLAY, payload: { name } });
          stateRef.current.overlay = undefined;
          break;
        default:
          break;
      }
    },
    [dispatch, editFormInput, handleKeyboardEvent, inputRef],
  );

  /**
   * @description Handles parent input events such as 'click', 'focusin' and 'focusout'.
   * @param {(Event)} event - The parent input event object.
   *
   * @al-dev93
   */
  const handleParentInputEvent = useCallback(
    (event: Event): void => {
      const input = inputRef.current;
      if (!input) return;

      const { name } = input;
      if (event.type === 'click') {
        input.focus();
        return;
      }
      if (event.type === 'focusin') {
        dispatch({ type: SET_INPUT_FOCUS, payload: { name, isFocused: true } });
        return;
      }
      if (event.type === 'focusout') dispatch({ type: SET_INPUT_FOCUS, payload: { name, isFocused: false } });
    },
    [dispatch, inputRef],
  );

  /**
   * @description Initializes the input state on mount and checks if the value is stored in localStorage.
   *
   * @al-dev93
   */
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (input) {
      const { name } = input;
      editFormInput(input);
      stateRef.current.isStored = !!localStorage.getItem(name); // Check if the value is already stored.
    }
  }, [editFormInput, inputRef]);

  /**
   * @description Adds event listeners to the input and its parent element.
   * Cleans up event listeners on component unmount.
   *
   * @al-dev93
   */
  useLayoutEffect((): (() => void) | void => {
    const input = inputRef.current;
    if (input) {
      ['change', 'focus', 'keydown', 'input'].forEach((eventType) =>
        input.addEventListener(eventType, handleInputEvent),
      );
      ['click', 'focusin', 'focusout'].forEach((eventType) =>
        input.parentElement?.addEventListener(eventType, handleParentInputEvent),
      );
      return () => {
        ['change', 'focus', 'keydown', 'input'].forEach((eventType) =>
          input.removeEventListener(eventType, handleInputEvent),
        );
        ['click', 'focusin', 'focusout'].forEach((eventType) =>
          input.parentElement?.removeEventListener(eventType, handleParentInputEvent),
        );
      };
    }
    return undefined;
  }, [handleInputEvent, handleParentInputEvent, inputRef]);

  /**
   * @description Monitors input changes and updates localStorage accordingly.
   *
   * @al-dev93
   */
  useLayoutEffect((): void => {
    const input = inputRef.current;
    const { isStored } = stateRef.current;

    if (input) {
      const { name, validity, value } = input;
      if (!value || !validity.valid || name === 'message') return;

      if (isStored) addToLocalStorage(value, name);
      else saveToLocalStorage(value, name, stateRef);
    }
  }, [inputRef, isInputFilled]);

  /**
   * @description Sets the input value from auto-complete selection and updates its state.
   *
   * @param {string} content - The value to set in the input.
   *
   * @al-dev93
   */
  const putAutoCompleteInInput = useCallback(
    (content: string): void => {
      const input = inputRef.current;
      if (!input) return;

      const { name } = input;
      input.value = content;
      input.focus();
      if (editFormInput(input, !!content)) dispatch({ type: SET_INPUT_VALUE, payload: { name, inputValue: content } });
    },
    [dispatch, editFormInput, inputRef],
  );

  return [putAutoCompleteInInput];
}
