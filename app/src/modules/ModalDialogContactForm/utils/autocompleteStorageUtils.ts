import { MutableRefObject } from 'react';

import type { OverlayType } from '../types';
import type { DialogFormInputElement } from '@/types';

/**
 * @description Saves the input value to localStorage.
 *
 * @param {string} value - The value to store.
 * @param {string} name - The name of the localStorage key.
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
 * @description Adds a value to localStorage, preserving previous values.
 *
 * @param {string} value - The value to store.
 * @param {string} name - The name of the localStorage key.
 *
 * @al-dev93
 */
export function addToLocalStorage(value: string, name: string): void {
  const storageSet = new Set(JSON.parse(localStorage.getItem(name) ?? '[]')).add(value);
  localStorage.setItem(name, JSON.stringify([...storageSet].sort()));
}

/**
 * @description //TODO: add comment
 *
 * @param {DialogFormInputElement} input - // TODO: add comment
 * @param {boolean} isStored - // TODO: add comment
 * @param {boolean} [filter] - // TODO: add comment (optional)
 * @returns {*}  {(string[] | undefined)}
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
