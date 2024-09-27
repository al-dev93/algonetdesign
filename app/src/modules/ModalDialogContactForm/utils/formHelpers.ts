import { MutableRefObject } from 'react';

import type { ModalDialogContactFormState } from '../types';
import type { StringObject } from '@/types';

/**
 * Extracts and prepares the submit data from the contact form state, excluding any fields with input errors.
 *
 * @function
 * @param {ModalDialogContactFormState} contactFormState - The current state of the contact form, where each key represents
 * an input field.
 * @returns {(StringObject | undefined)} - Returns an object containing the valid input values, or 'undefined' if no valid data
 * is present.
 *
 * @description
 * This function iterates through the contact form state and gathers the input values for fields that do not have any errors.
 * It returns an object where the keys are the input field names and the values are the corresponding input values.
 * If a field has an input error, it is skipped.
 *
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
 * Formats a numeric string by grouping digits into pairs separated by spaces.
 *
 * @function
 * @param {string} number - The numeric string to format.
 * @returns {string} - The formatted numeric string with spaces separating every two digits.
 *
 * @description
 * This function takes a numeric string input, removes any existing whitespace, and then inserts
 * a space after every two digits. It's used to format phone numbers.
 *
 * @example
 * // Returns '12 34 56 78 90'
 * formatInputNumber('1234567890');
 *
 * // Returns '01 23 45 67 89'
 * formatInputNumber('0123456789')
 *
 * @al-dev93
 */
export function formatInputNumber(number: string): string {
  return number.replace(/\s/g, '').replace(/(\d{2})(?=\d)/g, '$1 ');
}

/**
 * Checks if the form state contains any errors.
 *
 * @function
 * @param {ModalDialogContactFormState} state - The current form state.
 * @returns {boolean} Returns 'true' if any form field has an error, otherwise 'false'.
 *
 * @al-dev93
 */
export function hasFormErrors(state: ModalDialogContactFormState): boolean {
  return Object.keys(state).some((item) => !!state[item].inputError);
}

/**
 * Manages the visibility of the modal based on the modal's open state, alert state, and whether the form content has been
 * rendered. Updates the 'modalVisibility' ref accordingly to control modal display behavior.
 *
 * @function
 * @param {boolean} open - Indicates whether the modal is currently open.
 * @param {boolean} openAlert - Indicates whether an alert is currently shown.
 * @param {(MutableRefObject<boolean | undefined>)} modalVisibilityRef - A ref tracking the current visibility state of the modal.
 * @returns {void}
 *
 * @al-dev93
 */
export function manageModalVisibility(
  open: boolean,
  openAlert: boolean,
  modalVisibilityRef: MutableRefObject<boolean | undefined>,
) {
  const modalVisibility = modalVisibilityRef;
  const isVisible = modalVisibility.current;
  if (open && !openAlert && isVisible !== undefined) {
    modalVisibility.current = isVisible ? undefined : true;
  } else if (open && openAlert) modalVisibility.current = false;
}
