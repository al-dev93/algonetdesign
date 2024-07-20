import { KeyboardEventDiv } from '@/types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {KeyboardEventDiv} event
 * @param {(HTMLElement | SVGSVGElement | null)} element
 * @return {*}  {void}
 * @al-dev93
 */
export function setFocusToElement(event: KeyboardEventDiv, element: HTMLElement | SVGSVGElement | null): void {
  event.preventDefault();
  event.stopPropagation();
  element?.focus();
}
