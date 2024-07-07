import { useEffect, useRef } from 'react';

import style from './style.module.css';
import { putAutoCompleteInInput } from './utils/autoCompleteHelpers';

import type { PopoverProps } from '../../types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {PopoverProps} {
 *   errorMessage,
 *   fillList,
 *   firstItemFocused,
 *   prevFocusNode,
 *   dispatch,
 * }
 * @return {*}  {(JSX.Element | null)}
 * @al-dev93
 */
export function Popover({
  errorMessage,
  fillList,
  firstItemFocused,
  prevFocusNode,
  dispatch,
}: PopoverProps): JSX.Element | null {
  const activeItem = useRef<number>(0);
  const ulRef = useRef<HTMLUListElement>(null);
  /**
   *
   * @description // TODO: add comment
   * @param {HTMLUListElement} ulNode
   * @param {boolean} count
   * @return {*}  {void}
   * @al-dev93
   */
  const setActiveItem = (ulNode: HTMLUListElement, count: boolean): void => {
    if (fillList && activeItem.current > 0 && activeItem.current < fillList.length - 1)
      activeItem.current += count ? 1 : -1;
    else if (fillList && activeItem.current === 0)
      activeItem.current = count ? activeItem.current + 1 : fillList.length - 1;
    else if (fillList && activeItem.current === fillList.length - 1)
      activeItem.current = count ? 0 : activeItem.current - 1;
    return fillList && fillList?.length > 1
      ? (ulNode?.children.item(activeItem.current) as HTMLLIElement).focus()
      : (ulNode?.children.item(0) as HTMLLIElement).focus();
  };
  /**
   *
   * @description // TODO: add comment
   * @param {React.KeyboardEvent<HTMLLIElement>} event
   * @return {*}  {void}
   * @al-dev93
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    const ulNode = ulRef.current;
    if ((event.code === 'ArrowUp' || event.code === 'ArrowDown') && ulNode) {
      setActiveItem(ulNode, event.code === 'ArrowDown');
      return;
    }
    if (event.code === 'Escape') {
      prevFocusNode?.focus();
      return;
    }
    if (event.code === 'Enter' && prevFocusNode)
      putAutoCompleteInInput(prevFocusNode, event.currentTarget.textContent ?? '', dispatch);
  };
  /**
   *
   * @description // TODO: add comment
   * @param {React.MouseEvent<HTMLLIElement, MouseEvent>} event
   * @return {*} {void}
   * @al-dev93
   */
  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    event.preventDefault();
    event.stopPropagation();
    if (prevFocusNode) putAutoCompleteInInput(prevFocusNode, event.currentTarget.textContent ?? '', dispatch);
  };

  /**
   *
   * @description // TODO: add comment
   * @al-dev93
   */
  useEffect(() => {
    const ulNode = ulRef.current;
    if (firstItemFocused === undefined || !ulNode) return;
    if (ulNode.childElementCount) {
      const focusProperty = firstItemFocused ? 'first' : 'last';
      activeItem.current = firstItemFocused ? 0 : ulNode.childElementCount - 1;
      (ulNode[`${focusProperty}ElementChild`] as HTMLLIElement).focus();
    }
  }, [firstItemFocused]);

  return (
    ((errorMessage || !!fillList?.length) && (
      <div className={style.popoverWrapper}>
        {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
        <div className={`${style.autocompleteWrapper} ${!fillList ? style.disable : undefined}`}>
          <span className={style.borderTopList} />
          <ul className={style.listPopoverItem} ref={ulRef}>
            {fillList?.map((value) => (
              <li
                key={value}
                className={style.popoverItem}
                role='presentation'
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                onMouseDown={handleClick}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )) ||
    null
  );
}
