import { Dispatch, RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { DialogFormInputElement } from '@/types';

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
import { formatInputNumber, getAutocompleteInput, getInputValidityProperties } from '../utils/formHelpers';

import type { InputBorderBox, ModalDialogContactFormAction, OverlayType, Validity } from '../types';
/**
 *
 * custom hook useContactForm
 * @param {(RefObject<DialogFormInputElement>)} inputRef - // TODO: add comment
 * @param {Dispatch<ModalDialogContactFormAction>} dispatch - // TODO: add comment
 * @description // TODO: add comment
 * @exports useContactForm
 * @return {*}
 */
export function useContactForm(
  inputRef: RefObject<DialogFormInputElement>,
  dispatch: Dispatch<ModalDialogContactFormAction>,
) {
  const storageRef = useRef<boolean>(false);
  const overlayRef = useRef<OverlayType>();
  const [isInputFilled, setIsInputFilled] = useState<boolean>(false);

  /**
   *
   * updates the validity state of the active input field.
   * @param {DialogFormInputElement} input - // TODO: add comment
   * @param {boolean} [isAutocompleted] - // TODO: add comment (optional)
   * @description isAutocompleted allows for differentiated handling in the case
   * of an auto-completed value.
   * @return {*} {Validity}
   * @al-dev93
   */
  const updateErrorState = useCallback(
    (input: DialogFormInputElement, isAutocompleted?: boolean): Validity => {
      const { name } = input;
      const inputError = getInputValidityProperties(input, isAutocompleted);
      if (inputError?.valid) dispatch({ type: DELETE_INPUT_ERROR, payload: { name } });
      else
        dispatch({
          type: SET_INPUT_ERROR,
          payload: { name, inputError },
        });
      return inputError;
    },
    [dispatch],
  );
  /**
   *
   * manages the display and update of a tag in the active required input field,
   * indicating whether it needs to be filled or modified.
   * @param {DialogFormInputElement} input
   * @param {Validity} inputValidity
   * @return {*} {void}
   * @al-dev93
   */
  const setInputErrorTag = useCallback(
    (input: DialogFormInputElement, inputValidity: Validity): void => {
      const { name } = input;
      const error = !inputValidity.valid;
      const { valueMissing } = inputValidity;
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
   * sets the border style of the active input field to distinguish between an incorrect
   * input and a correctly edited input field.
   * @param {DialogFormInputElement} input
   * @param {Validity} inputValidity
   * @return {*} {void}
   * @al-dev93
   */
  const setInputBorderBox = useCallback(
    (input: DialogFormInputElement, inputValidity: Validity): void => {
      const { name, value } = input;
      const error = !inputValidity.valid;
      const borderStyle = (error ? 'isInError' : !!value && 'isEdited') as InputBorderBox;
      dispatch({ type: SET_INPUT_BORDER_BOX, payload: { name, borderStyle } });
    },
    [dispatch],
  );
  /**
   *
   * edits the active form input field's by updating the border, error tag, and error state.
   * @param {DialogFormInputElement} input
   * @param {boolean} [isAutocompleted]
   * @description this function ensures the update of the validity state, the display or
   * removal of an error tag for a required field, and the application of a border style based
   * on the error state or correct editing.
   * isAutocompleted differentiates error handling between a manually entered value and a vakue
   * injected via auto-completion.
   * @return {*} {boolean}
   * @al-dev93
   */
  const editFormInput = useCallback(
    (input: DialogFormInputElement, isAutocompleted?: boolean): boolean => {
      const { required } = input;
      const inputValidity = updateErrorState(input, isAutocompleted);
      if (required) setInputErrorTag(input, inputValidity);
      setInputBorderBox(input, inputValidity);
      return inputValidity.valid;
    },
    [setInputBorderBox, setInputErrorTag, updateErrorState],
  );
  /**
   *
   * @description //TODO: add comment
   * @al-dev93
   */
  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      const { name } = input;
      editFormInput(input);
      storageRef.current = !!localStorage.getItem(name);
    }
  }, [editFormInput, inputRef]);
  /**
   *
   * @description //TODO: add comment
   * @param {DialogFormInputElement} input
   * @return {*} {void}
   * @al-dev93
   */
  const onInputEvent = useCallback(
    (input: DialogFormInputElement): void => {
      const { name } = input;
      editFormInput(input);
      const autoComplete = getAutocompleteInput(input, storageRef.current, true);
      overlayRef.current = AUTOCOMPLETE;
      if (autoComplete) dispatch({ type: SET_AUTO_COMPLETE, payload: { name, autoComplete } });
    },
    [dispatch, editFormInput],
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
      const { name, type, value: inputValue } = input;
      const error = !input.validity.valid;
      if (event.type === 'input') {
        if (type === 'tel') {
          const formattedValue = formatInputNumber(inputValue);
          input.value = formattedValue;
        }
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
      input.value = content;
      input.focus();
      if (editFormInput(input, !!content)) dispatch({ type: SET_INPUT_VALUE, payload: { name, inputValue: content } });
    }
  }
  return [putAutoCompleteInInput];
}
