import type { ModalDialogContactFormState } from '../types';
import type { StringObject } from '@/types';

/**
 * @description // TODO: add comment
 *
 * @param {ModalDialogContactFormState} contactFormState - // TODO: add comment
 * @returns {(StringObject | undefined)}
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
 * @description // TODO: add comment
 *
 * @param {string} number - // TODO: add comment
 * @return {string}  {string}
 *
 * @al-dev93
 */
export function formatInputNumber(number: string): string {
  return number.replace(/\s/g, '').replace(/(\d{2})(?=\d)/g, '$1 ');
}
