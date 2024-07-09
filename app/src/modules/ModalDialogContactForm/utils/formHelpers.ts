import type { Validity } from '../types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {(HTMLInputElement | HTMLTextAreaElement)} input
 * @return {*}  {Validity}
 * @al-dev93
 */
export function getInputValidityProperties(input: HTMLInputElement | HTMLTextAreaElement, content?: string): Validity {
  const { minLength, required } = input;
  const { pattern } = input as HTMLInputElement;

  if (content) {
    const valueMissing = required ? !content.length : undefined;
    const patternMismatch = pattern ? !new RegExp(pattern).test(content) : undefined;
    const tooShort = minLength ? !(content.length >= minLength) : undefined;
    const valid = (!valueMissing ?? true) && (!patternMismatch ?? true) && (!tooShort ?? true);
    return { minLength, patternMismatch, tooShort, valid, valueMissing };
  }

  const { patternMismatch, tooShort, valid, valueMissing } = input.validity;
  return { minLength, patternMismatch, tooShort, valid, valueMissing };
}
/**
 *
 * @description //TODO: add comment
 * @export
 * @param {(HTMLInputElement | HTMLTextAreaElement)} input
 * @param {boolean} isStored
 * @param {boolean} [filter]
 * @return {*}  {(string[] | undefined)}
 * @al-dev93
 */
export function getAutocompleteInput(
  input: HTMLInputElement | HTMLTextAreaElement,
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
