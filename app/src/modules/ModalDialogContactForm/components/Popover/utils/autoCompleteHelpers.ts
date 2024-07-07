import { Dispatch } from 'react';

import { SET_INPUT_VALUE } from '@modules/ModalDialogContactForm/utils/constants';

import type { ModalDialogContactFormAction } from '@modules/ModalDialogContactForm/types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {(HTMLInputElement | HTMLTextAreaElement)} input
 * @param {string} inputValue
 * @param {Dispatch<ModalDialogContactFormAction>} dispatch
 * @al-dev93
 */
export function putAutoCompleteInInput(
  input: HTMLInputElement | HTMLTextAreaElement,
  inputValue: string,
  dispatch: Dispatch<ModalDialogContactFormAction>,
): void {
  const inputNode = input;
  const { name } = inputNode;
  dispatch({
    type: SET_INPUT_VALUE,
    payload: { name, inputValue },
  });
  inputNode.focus();
  inputNode.value = inputValue;
}
