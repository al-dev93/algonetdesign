import { KeyboardEvent } from 'react';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {KeyboardEvent<HTMLDivElement>} event
 * @param {(HTMLElement | SVGSVGElement | null)} element
 * @return {*}  {void}
 * @al-dev93
 */
export function setFocusToElement(
  event: KeyboardEvent<HTMLDivElement>,
  element: HTMLElement | SVGSVGElement | null,
): void {
  event.preventDefault();
  event.stopPropagation();
  element?.focus();
}
