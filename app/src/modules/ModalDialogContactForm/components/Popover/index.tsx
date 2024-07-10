import { useEffect, useRef } from 'react';

import style from './style.module.css';

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
 *   inputAutocomplete,
 * }
 * @return {*}  {(JSX.Element | null)}
 * @al-dev93
 */
export function Popover({
  autocompleteList,
  errorMessage,
  errorState,
  firstItemFocused,
  inputAutocomplete,
  prevFocusNode,
}: PopoverProps): JSX.Element | null {
  const listOfError = errorState
    ? Object.entries(errorState).filter(([key, value]) => key !== 'minLength' && key !== 'valid' && value)
    : undefined;

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
    if (autocompleteList && activeItem.current > 0 && activeItem.current < autocompleteList.length - 1)
      activeItem.current += count ? 1 : -1;
    else if (autocompleteList && activeItem.current === 0)
      activeItem.current = count ? activeItem.current + 1 : autocompleteList.length - 1;
    else if (autocompleteList && activeItem.current === autocompleteList.length - 1)
      activeItem.current = count ? 0 : activeItem.current - 1;
    return autocompleteList && autocompleteList?.length > 1
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
    if (event.code === 'Enter' && prevFocusNode) inputAutocomplete(event.currentTarget.textContent ?? '');
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
    inputAutocomplete(event.currentTarget.textContent ?? '');
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
    ((errorState || !!autocompleteList?.length) && (
      <div className={style.popoverWrapper}>
        {errorState && (
          <p className={style.errorMessage}>
            {listOfError
              ? listOfError.map(([key]) => errorMessage?.[key as keyof typeof errorMessage]).join('\n')
              : null}
          </p>
        )}
        <div className={`${style.autocompleteWrapper} ${!autocompleteList ? style.disable : undefined}`}>
          <span className={style.borderTopList} />
          <ul className={style.listPopoverItem} ref={ulRef}>
            {autocompleteList?.map((value) => (
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
