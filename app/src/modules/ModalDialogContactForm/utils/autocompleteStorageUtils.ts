import { MutableRefObject } from 'react';

import type { OverlayType } from '../types';
import type { DialogFormInputElement } from '@/types';

/**
 * Saves the provided value to local storage under the specified key (name) and updates the state reference.
 *
 * @function
 * @param {string} value - The value to be stored in local storage.
 * @param {string} name - The key under which the value will be stored in local storage.
 * @param {MutableRefObject<{ isStored: boolean; overlay: OverlayType | undefined }>} stateRef - A mutable reference object
 * to track the state of whether the value is stored and the overlay state.
 * @returns {void}
 *
 * @description
 * This function saves a value to local storage associated with the provided 'name'.
 * It also updates the 'isStored' flag in the 'stateRef' to indicate that the value has been successfully stored.
 *
 * @al-dev93
 */
export function saveToLocalStorage(
  value: string,
  name: string,
  stateRef: MutableRefObject<{
    isStored: boolean;
    overlay: OverlayType | undefined;
  }>,
): void {
  const state = stateRef;
  localStorage.setItem(name, JSON.stringify([value]));
  state.current.isStored = true;
}

/**
 * Adds a value to the existing set of values in local storage under the specified key (name).
 * The values are stored in sorted order.
 *
 * @function
 * @param {string} value - The value to be added to local storage.
 * @param {string} name - The key under which the value will be stored in local storage.
 * @returns {void}
 *
 * @description
 * This function retrieves the existing values stored under the specified 'name' in local storage,
 * adds the new 'value' to the set, sorts the values alphabetically, and stores the updated set back
 * into local storage. If no values are found under the key, an empty array is created before adding the new value.
 *
 * @al-dev93
 */
export function addToLocalStorage(value: string, name: string): void {
  const storageSet = new Set(JSON.parse(localStorage.getItem(name) ?? '[]')).add(value);
  localStorage.setItem(name, JSON.stringify([...storageSet].sort()));
}

/**
 * Retrieves a list of auto-complete suggestions from local storage for the given input field.
 *
 * @function
 * @param {DialogFormInputElement} input - The input element for which to retrieve auto-complete suggestions.
 * @param {boolean} isStored - A flag indicating if there is existing data stored in local storage for the input.
 * @param {boolean} [filter] - Optional flag to filter the suggestions based on the input value.
 * @returns {(string[] | undefined)} Returns an array of auto-complete suggestions, or undefined if none are available.
 *
 * @description
 * If the 'filter' flag is provided, the function filters the stored auto-complete suggestions to only include those
 * that start with the current value of the input (case-insensitive). if 'filter' is not provided or is false, the function
 * returns the stored suggestions if 'isStored' is true, otherwise it returns 'undefined'.
 *
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
