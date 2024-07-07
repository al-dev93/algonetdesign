import { Dispatch, useCallback, useEffect, useRef, useState } from 'react';

import {
  AUTOCOMPLETE,
  DELETE_ERROR_TAG_NAME,
  DELETE_INPUT_ERROR,
  HISTORY,
  RESET_AUTO_COMPLETE_OVERLAY,
  SET_AUTO_COMPLETE,
  SET_ERROR_TAG_NAME,
  SET_INPUT_BORDER_BOX,
  SET_INPUT_ERROR,
  SET_INPUT_FOCUS,
  SET_INPUT_VALUE,
  SET_OVERLAY_FIRST_ITEM_FOCUS,
} from '../utils/constants';
import { getAutocompleteInput, getInputValidityProperties } from '../utils/formHelpers';

import type { ModalDialogContactFormAction, ModalDialogContactFormState, OverlayType } from '../types';

/**
 * @description
 * @param inputRef
 * @returns
 */
export function useContactForm(
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>,
  state: ModalDialogContactFormState,
  dispatch: Dispatch<ModalDialogContactFormAction>,
) {
  const [toggleUpdate, setToggleUpdate] = useState<boolean>(false);

  const storageRef = useRef<boolean>(false);
  const overlayRef = useRef<OverlayType>();

  /**
   * @description //TODO: add comment
   * @param {(HTMLInputElement | HTMLTextAreaElement)} input
   * @return {*} {void}
   * @al-dev93
   */
  const updateErrorState = useCallback(
    (input: HTMLInputElement | HTMLTextAreaElement): void => {
      if (input.validity.valid) dispatch({ type: DELETE_INPUT_ERROR, payload: { name: input.name } });
      else
        dispatch({
          type: SET_INPUT_ERROR,
          payload: { name: input.name, inputError: getInputValidityProperties(input) },
        });
    },
    [dispatch],
  );
  /**
   *
   * @description //TODO: add comment
   * @param {(HTMLInputElement | HTMLTextAreaElement)} input
   * @return {*} {void}
   * @al-dev93
   */
  const setInputErrorTag = useCallback(
    (input: HTMLInputElement | HTMLTextAreaElement): void => {
      const error = !input.validity.valid;
      if (error)
        dispatch({
          type: SET_ERROR_TAG_NAME,
          payload: {
            name: input.name,
            errorTagName: input.validity.valueMissing ? 'remplir' : 'modifier',
          },
        });
      else dispatch({ type: DELETE_ERROR_TAG_NAME, payload: { name: input.name } });
    },
    [dispatch],
  );
  /**
   *
   * @description //TODO: add comment
   * @param {(HTMLInputElement | HTMLTextAreaElement)} input
   * @return {*} {void}
   * @al-dev93
   */
  const setInputBorderBox = useCallback(
    (input: HTMLInputElement | HTMLTextAreaElement): void => {
      const error = !input.validity.valid;
      if (input.value && !error)
        dispatch({ type: SET_INPUT_BORDER_BOX, payload: { name: input.name, borderStyle: 'isEdited' } });
      if (error) dispatch({ type: SET_INPUT_BORDER_BOX, payload: { name: input.name, borderStyle: 'isInError' } });
    },
    [dispatch],
  );
  /**
   *
   * @description //TODO: add comment
   * @al-dev93
   */
  useEffect(() => {
    const input = inputRef.current;
    const required = input?.required;
    if (input) {
      updateErrorState(input);
      if (required) setInputErrorTag(input);
      setInputBorderBox(input);
      storageRef.current = !!localStorage.getItem(input.name);
    }
  }, [inputRef, setInputBorderBox, setInputErrorTag, updateErrorState, inputRef.current?.value]);
  /**
   *
   * @description //TODO: add comment
   * @param {(HTMLInputElement | HTMLTextAreaElement)} input
   * @return {*} {void}
   * @al-dev93
   */
  const onInputEvent = useCallback(
    (input: HTMLInputElement | HTMLTextAreaElement): void => {
      const autoComplete = getAutocompleteInput(input, storageRef.current, true);
      overlayRef.current = AUTOCOMPLETE;
      if (autoComplete) dispatch({ type: SET_AUTO_COMPLETE, payload: { name: input.name, autoComplete } });
    },
    [dispatch],
  );
  /**
   *
   * @description //TODO: add comment
   * @param {(KeyboardEvent)} event
   * @return {*} {void}
   * @al-dev93
   */
  const onKeyboardEvent = useCallback(
    (event: KeyboardEvent): void => {
      const input = inputRef.current;
      if (!input) return;
      const autoComplete = getAutocompleteInput(input, storageRef.current);
      if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        if (overlayRef.current !== AUTOCOMPLETE) {
          overlayRef.current = HISTORY;
          if (autoComplete) dispatch({ type: SET_AUTO_COMPLETE, payload: { name: input.name, autoComplete } });
        }
        dispatch({
          type: SET_OVERLAY_FIRST_ITEM_FOCUS,
          payload: { name: input.name, overlayFirstItemFocus: event.code === 'ArrowDown' },
        });
      }
    },
    [dispatch, inputRef],
  );
  /**
   *
   * @description //TODO: add comment
   * @param {(Event)} event
   * @return {*} {void}
   * @al-dev93
   */
  const handleInputEvent = useCallback(
    (event: Event): void => {
      const input = inputRef.current;
      if (!input) return;
      const error = !input.validity.valid;
      if (event.type === 'input') {
        onInputEvent(input);
        return;
      }
      if (event.type === 'change') {
        if (!error) dispatch({ type: SET_INPUT_VALUE, payload: { name: input.name, inputValue: input.value } });
        return;
      }
      if (event.type === 'keydown') {
        onKeyboardEvent(event as KeyboardEvent);
        return;
      }
      if (event.type === 'focus') {
        dispatch({ type: RESET_AUTO_COMPLETE_OVERLAY, payload: { name: input.name } });
        overlayRef.current = undefined;
      }
    },
    [dispatch, inputRef, onInputEvent, onKeyboardEvent],
  );
  /**
   *
   * @description //TODO: add comment
   * @param {(Event)} event
   * @return {*} {void}
   * @al-dev93
   */
  const handleParentInputEvent = useCallback(
    (event: Event): void => {
      const input = inputRef.current;
      if (!input) return;
      if (event.type === 'click') {
        input.focus();
        return;
      }
      if (event.type === 'focusin') {
        dispatch({ type: SET_INPUT_FOCUS, payload: { name: input.name, isFocused: true } });
        return;
      }
      if (event.type === 'focusout')
        dispatch({ type: SET_INPUT_FOCUS, payload: { name: input.name, isFocused: false } });
    },
    [dispatch, inputRef],
  );
  /**
   *
   * @description //TODO: add comment
   * @al-dev93
   */
  useEffect((): (() => void) | void => {
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
   *
   * @description //TODO: add comment
   * @param {(HTMLInputElement | HTMLTextAreaElement)} input
   * @return {*} {void}
   * @al-dev93
   */
  const saveToLocalStorage = useCallback((input: HTMLInputElement | HTMLTextAreaElement): void => {
    localStorage.setItem(input.name, JSON.stringify([input.value]));
    storageRef.current = true;
  }, []);
  /**
   *
   * @description //TODO: add comment
   * @param {(HTMLInputElement | HTMLTextAreaElement)} input
   * @return {*} {void}
   * @al-dev93
   */
  const addToLocalStorage = useCallback((input: HTMLInputElement | HTMLTextAreaElement): void => {
    const storageSet = new Set(JSON.parse(localStorage.getItem(input.name) ?? '[]')).add(input.value);
    localStorage.setItem(input.name, JSON.stringify([...storageSet].sort()));
  }, []);
  /**
   *
   * @description //TODO: add comment
   * @al-dev93
   */
  useEffect((): void => {
    const input = inputRef.current;
    const isStored = storageRef.current;
    if (input) {
      const error = !input.validity.valid;
      if (!input.value || error || input.name === 'message') return;
      if (isStored) addToLocalStorage(input);
      else saveToLocalStorage(input);
    }
  }, [addToLocalStorage, inputRef, saveToLocalStorage, inputRef.current?.value]);

  // const setErrorMessage = (errorMessage: InputErrorMessage): string | undefined => {
  //   if (!error) return undefined;
  //   return Object.entries(errorMessage[name]).reduce((acc: string, [key, message]) => {
  //     if (error[key as keyof Validity]) {
  //       if (name !== 'email') {
  //         if (name === 'name' && key === 'tooShort')
  //           return !acc
  //             ? `${label} ${message} ${error.minLength} caractères`
  //             : `${acc}\nIl ${message} ${error.minLength} caractères`;
  //         return !acc ? `${label} ${message}` : `${acc}\nIl ${message}`;
  //       }
  //       if (key === 'valueMissing') return `${label} ${message}`;
  //       return !acc ? `${message}` : `${acc}\n${message}`;
  //     }
  //     return acc;
  //   }, ``);
  // };
  return {
    toggleUpdate,
  };
}
