import { DELETE_ERROR_TAG_NAME, SET_ERROR_TAG_NAME, SET_INPUT_BORDER_BOX } from './constants';

import type { ErrorTagComponent, InputBorderBox, InputComponent, Validity } from '../types';
import type { DialogFormInputElement } from '@/types';

/**
 * @description sets the border style of the active input field to distinguish between an incorrect
 * input and a correctly edited input field.
 *
 * @param {DialogFormInputElement} input - The active input field to update.
 * @param {Validity} inputValidity - The validity state of the active input field.
 * @returns {InputComponent} Update input element state with border style
 *
 * @al-dev93
 */
export function setInputBorderBox(input: DialogFormInputElement, inputValidity: Validity): InputComponent {
  const { name, value } = input;
  const borderStyle = (!inputValidity.valid ? 'error' : !!value && 'edited') as InputBorderBox;

  return { type: SET_INPUT_BORDER_BOX, payload: { name, borderStyle } };
}

/**
 * @description Sets or removes the error tag on the input based on its validity state.
 *
 * @param {DialogFormInputElement} input - The active input field to update.
 * @param {Validity} inputValidity - The validity state of the active input field.
 *
 * @al-dev93
 */
export function setInputErrorTag(input: DialogFormInputElement, inputValidity: Validity): ErrorTagComponent {
  const { name } = input;

  return {
    type: inputValidity.valid ? DELETE_ERROR_TAG_NAME : SET_ERROR_TAG_NAME,
    payload: {
      name,
      errorTagName: inputValidity.valueMissing ? 'remplir' : 'modifier',
    },
  };
}

/**
 * @description // TODO: add comment
 *
 * @param {DialogFormInputElement} input - // TODO: add comment
 * @param {(boolean | undefined)} isAutocompleted - // TODO: add comment
 * @returns {Validity}
 *
 * @al-dev93
 */
export function getInputValidityProperties(
  input: DialogFormInputElement,
  isAutocompleted: boolean | undefined,
): Validity {
  const { minLength, required, value } = input;
  const { pattern } = input as HTMLInputElement;

  if (isAutocompleted) {
    const valueMissing = required ? !value.length : false;
    const patternMismatch = pattern ? !new RegExp(pattern).test(value) : false;
    const tooShort = minLength ? !(value.length >= minLength) : false;
    const valid = !valueMissing && !patternMismatch && !tooShort;
    return { minLength, patternMismatch, tooShort, valid, valueMissing };
  }

  const { patternMismatch, tooShort, valid, valueMissing } = input.validity;
  return { minLength, patternMismatch, tooShort, valid, valueMissing };
}
