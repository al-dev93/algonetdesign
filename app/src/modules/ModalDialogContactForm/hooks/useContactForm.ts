import { Dispatch, RefObject, useCallback, useEffect, useRef, useState } from 'react';

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

import type { InputBorderBox, ModalDialogContactFormAction, OverlayType, Validity } from '../types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {(RefObject<HTMLInputElement | HTMLTextAreaElement>)} inputRef
 * @param {Dispatch<ModalDialogContactFormAction>} dispatch
 * @param {ModalDialogContactFormState} [state]
 * @return {*}
 */
export function useContactForm(
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: Dispatch<ModalDialogContactFormAction>,
) {
  const storageRef = useRef<boolean>(false);
  const overlayRef = useRef<OverlayType>();
  const autoCompleteContent = useRef<string>();
  const autoCompleteValidity = useRef<Validity>();
  const [isInputFilled, setIsInputFilled] = useState<boolean>(false);

  /**
   *
   * @description //TODO: add comment
   * @param {(HTMLInputElement | HTMLTextAreaElement)} input
   * @param {string} [inputContent]
   * @return {*} {void}
   * @al-dev93
   */
  const updateErrorState = useCallback(
    (input: HTMLInputElement | HTMLTextAreaElement, inputContent?: string): void => {
      const { name } = input;
      const inputError = inputContent ? autoCompleteValidity.current : getInputValidityProperties(input);
      if (inputError?.valid) dispatch({ type: DELETE_INPUT_ERROR, payload: { name } });
      else
        dispatch({
          type: SET_INPUT_ERROR,
          payload: { name, inputError },
        });
    },
    [dispatch],
  );
  /**
   *
   * @description //TODO: add comment
   * @param {(HTMLInputElement | HTMLTextAreaElement)} input
   * @param {string} [inputContent]
   * @return {*} {void}
   * @al-dev93
   */
  const setInputErrorTag = useCallback(
    (input: HTMLInputElement | HTMLTextAreaElement, inputContent?: string): void => {
      const { name, validity } = input;
      const error = inputContent ? !autoCompleteValidity.current?.valid : !validity.valid;
      const valueMissing = inputContent ? autoCompleteValidity.current?.valueMissing : validity.valueMissing;
      if (error) {
        const errorTagName = valueMissing ? 'remplir' : 'modifier';
        dispatch({
          type: SET_ERROR_TAG_NAME,
          payload: {
            name,
            errorTagName,
          },
        });
      } else dispatch({ type: DELETE_ERROR_TAG_NAME, payload: { name } });
    },
    [dispatch],
  );
  /**
   *
   * @description //TODO: add comment
   * @param {(HTMLInputElement | HTMLTextAreaElement)} input
   * @param {string} [inputContent]
   * @return {*} {void}
   * @al-dev93
   */
  const setInputBorderBox = useCallback(
    (input: HTMLInputElement | HTMLTextAreaElement, inputContent?: string): void => {
      const { name, value, validity } = input;
      const error = inputContent ? !autoCompleteValidity.current?.valid : !validity.valid;
      const borderStyle = (error ? 'isInError' : (!!value || !!inputContent) && 'isEdited') as InputBorderBox;
      dispatch({ type: SET_INPUT_BORDER_BOX, payload: { name, borderStyle } });
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
      updateErrorState(input, autoCompleteContent.current);
      if (required) setInputErrorTag(input, autoCompleteContent.current);
      setInputBorderBox(input, autoCompleteContent.current);
      storageRef.current = !!localStorage.getItem(input.name);
      if (autoCompleteContent.current) {
        autoCompleteContent.current = undefined;
        autoCompleteValidity.current = undefined;
      }
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
      const { name } = input;
      const autoComplete = getAutocompleteInput(input, storageRef.current, true);
      overlayRef.current = AUTOCOMPLETE;
      if (autoComplete) dispatch({ type: SET_AUTO_COMPLETE, payload: { name, autoComplete } });
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
      const { name } = input;
      const autoComplete = getAutocompleteInput(input, storageRef.current);
      if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        const overlayFirstItemFocus = event.code === 'ArrowDown';
        if (overlayRef.current !== AUTOCOMPLETE) {
          overlayRef.current = HISTORY;
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
      const { name, value: inputValue } = input;
      const error = !input.validity.valid;
      if (event.type === 'input') {
        onInputEvent(input);
        return;
      }
      if (event.type === 'change') {
        if (!error) dispatch({ type: SET_INPUT_VALUE, payload: { name, inputValue } });
        setIsInputFilled((current) => !current);
        return;
      }
      if (event.type === 'keydown') {
        onKeyboardEvent(event as KeyboardEvent);
        return;
      }
      if (event.type === 'focus') {
        dispatch({ type: RESET_AUTO_COMPLETE_OVERLAY, payload: { name } });
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
  const saveToLocalStorage = useCallback((value: string, name: string): void => {
    localStorage.setItem(name, JSON.stringify([value]));
    storageRef.current = true;
  }, []);
  /**
   *
   * @description //TODO: add comment
   * @param {(HTMLInputElement | HTMLTextAreaElement)} input
   * @return {*} {void}
   * @al-dev93
   */
  const addToLocalStorage = useCallback((value: string, name: string): void => {
    const storageSet = new Set(JSON.parse(localStorage.getItem(name) ?? '[]')).add(value);
    localStorage.setItem(name, JSON.stringify([...storageSet].sort()));
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
      const { name, validity, value } = input;
      const error = !validity.valid;
      if (!value || error || name === 'message') return;
      if (isStored) addToLocalStorage(value, name);
      else saveToLocalStorage(value, name);
    }
  }, [addToLocalStorage, inputRef, isInputFilled, saveToLocalStorage]);
  /**
   *
   * @description // TODO: add comment
   * @param {string} content
   * @return {*} {void}
   * @al-dev93
   */
  function putAutoCompleteInInput(content: string): void {
    const input = inputRef.current;
    if (!input) return;
    const { name } = input;
    if (content) {
      autoCompleteContent.current = content;
      autoCompleteValidity.current = getInputValidityProperties(input, content);
      if (autoCompleteValidity.current.valid)
        dispatch({ type: SET_INPUT_VALUE, payload: { name, inputValue: content } });
      input.focus();
      input.value = content;
    }
  }

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
  return [putAutoCompleteInInput];
}
