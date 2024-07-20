import { DialogFormInputElement, StringObject } from '@/types';

import type { ModalDialogContactFormState, Validity } from '../types';
/**
 *
 * @description // TODO: add comment
 * @function getInputValidityProperties
 * @param {DialogFormInputElement} input - // TODO: add comment
 * @param {(boolean | undefined)} isAutocompleted - // TODO: add comment
 * @return {*}  {Validity}
 * @exports
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
/**
 *
 * @description //TODO: add comment
 * @function getAutocompleteInput
 * @param {DialogFormInputElement} input - // TODO: add comment
 * @param {boolean} isStored - // TODO: add comment
 * @param {boolean} [filter] - // TODO: add comment (optional)
 * @return {*}  {(string[] | undefined)}
 * @exports
 * @al-dev93
 */
export function getAutocompleteInput(
  input: DialogFormInputElement,
  isStored: boolean,
  filter?: boolean,
): string[] | undefined {
  const storeArray: string[] = JSON.parse(localStorage.getItem(input.name) ?? '[]');

  if (filter) {
    return storeArray.length && input
      ? storeArray.filter((storage) => storage.toUpperCase().startsWith(input.value.toUpperCase()))
      : undefined;
  }
  return isStored ? JSON.parse(localStorage.getItem(input.name) ?? '[]') : undefined;
}
/**
 *
 * @description // TODO: add comment
 * @function getSubmitData
 * @param {ModalDialogContactFormState} contactFormState - // TODO: add comment
 * @return {*} {StringObject | undefined}
 * @exports
 * @al-dev93
 */
export function getSubmitData(contactFormState: ModalDialogContactFormState): StringObject | undefined {
  const inputValues: { [key: string]: string | '' } | undefined = {};
  Object.keys(contactFormState).forEach((item) => {
    if (contactFormState[item].inputError) return;
    inputValues[item] = contactFormState[item].inputValue || '';
  });
  return { ...inputValues };
}
/**
 *
 * @description // TODO: add comment
 * @function formatInputNumber
 * @param {string} number - // TODO: add comment
 * @return {*}  {string}
 * @exports
 * @al-dev93
 */
export function formatInputNumber(number: string): string {
  return number.replace(/\s/g, '').replace(/(\d{2})(?=\d)/g, '$1 ');
}
