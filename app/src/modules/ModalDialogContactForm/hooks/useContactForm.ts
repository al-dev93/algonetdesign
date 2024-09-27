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
 * Custom hook that manages the state and behavior of a contact form input field.
 * This includes validation, error handling, auto-completion, and localStorage management.
 *
 * @function
 * @param {(RefObject<DialogFormInputElement>)} inputRef - Reference to the input element in the form.
 * @param {Dispatch<ModalDialogContactFormAction>} dispatch - Dispatch function to update the form state.
 * @returns {[(content: string) => void]} A function to set the input value from the auto-completion suggestions.
 *
 * @al-dev93
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
   * Edits the form input, updating its border, error tag, and validation state.
   *
   * @function
   * @param {DialogFormInputElement} input - The active input field to be edited.
   * @param {boolean} [isAutocompleted = false] - Indicates whether the input value was set via auto-completion.
   * @returns {boolean} Returns 'true' if the input is valid, otherwise 'false'.
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
   * handles keyboard events such as 'ArrowDown' and 'ArrowUp'.
   *
   * @function
   * @param {(KeyboardEvent)} event - The keyboard event object.
   * @returns {void}
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
   * Handles input events such as 'input', 'change', 'keydown', and 'focus'.
   *
   * @function
   * @param {(Event)} event - The event object.
   * @returns {void}
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
   * Handles parent input events such as 'click', 'focusin' and 'focusout'.
   *
   * @function
   * @param {(Event)} event - The parent input event object.
   * @returns {void}
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
   * Initializes the input state on mount and checks if the value is stored in localStorage.
   *
   * @returns {void}
   */
  useLayoutEffect((): void => {
    const input = inputRef.current;
    if (input) {
      const { name } = input;
      editFormInput(input);
      stateRef.current.isStored = !!localStorage.getItem(name); // Check if the value is already stored.
    }
  }, [editFormInput, inputRef]);

  /**
   * Registers event listeners on the input field and its parent to track changes, focus, and input events.
   * Cleans up the event listeners when the component unmounts.
   *
   * Events tracked include 'change', 'focus', 'keydown', 'input', 'click', 'focusin' and 'focusout'.
   *
   * @returns {void | (() => void)}
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
   * Monitors input changes and updates localStorage accordingly.
   *
   * @returns {void}
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
   * Sets the input value from auto-complete selection and updates its state.
   *
   * @function
   * @param {string} content - The value to set in the input.
   * @returns {void}
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
