import classNames from 'classnames';
import React, { KeyboardEvent, MouseEvent, useCallback, useEffect, useRef } from 'react';

import style from './style.module.css';

import type { PopoverProps } from '../../types';
/**
 *
 * Popover component that displays a list of autocomplete suggestions and error messages.
 *
 * @component
 * @param {PopoverProps} props - The properties for the Popover component.
 * @property {string[]} [autocompleteList] - List of autocomplete suggestions to display.
 * @property {ErrorMessage} [errorMessage] - Error messages associated with input validation.
 * @property {Validity} [errorState] - State representing input validity errors.
 * @property {boolean} [firstItemFocused] - Determines whether the first item in the list should be focused.
 * @property {(content: string) => void} inputAutocomplete - Callback function to handle input autocomplete.
 * @property {(DialogFormInputElement | null)} [prevFocusNode] - The previous input element to focus back to when necessary.
 * @returns {(React.JSX.Element | null)} The rendered Popover component or null if no suggestions or errors.
 *
 * @al-dev93
 */
export function Popover({
  autocompleteList,
  errorMessage,
  errorState,
  firstItemFocused,
  inputAutocomplete,
  prevFocusNode,
}: PopoverProps): React.JSX.Element | null {
  const listOfError = errorState
    ? Object.entries(errorState).filter(([key, value]) => key !== 'minLength' && key !== 'valid' && value)
    : undefined;

  const activeItem = useRef<number>(0);
  const ulRef = useRef<HTMLUListElement>(null);

  /**
   * Sets the active item in the autocomplete list based on the given count.
   *
   * @function
   * @param {HTMLUListElement} ulNode - The list element.
   * @param {boolean} count - Whether to increment or decrement the active item index.
   * @returns {void}
   */
  const setActiveItem = useCallback(
    (ulNode: HTMLUListElement, count: boolean): void => {
      if (!autocompleteList) return;

      if (activeItem.current > 0 && activeItem.current < autocompleteList.length - 1)
        activeItem.current += count ? 1 : -1;
      else if (activeItem.current === 0)
        activeItem.current = count ? activeItem.current + 1 : autocompleteList.length - 1;
      else if (activeItem.current === autocompleteList.length - 1)
        activeItem.current = count ? 0 : activeItem.current - 1;

      const nextItem = ulNode.children.item(activeItem.current) as HTMLLIElement;
      if (nextItem) nextItem.focus();
    },
    [autocompleteList],
  );

  /**
   * Handles key down events for navigating and selecting autocomplete items.
   *
   * @function
   * @param {KeyboardEvent<HTMLLIElement>} event - The keyboard event.
   * @returns {void}
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLLIElement>): void => {
      event.preventDefault();
      event.stopPropagation();
      const ulNode = ulRef.current;
      if (!ulNode) return;

      switch (event.code) {
        case 'ArrowDown':
          setActiveItem(ulNode, true);
          break;
        case 'ArrowUp':
          setActiveItem(ulNode, false);
          break;
        case 'Enter':
          if (prevFocusNode) inputAutocomplete(event.currentTarget.textContent ?? '');
          break;
        case 'Escape':
          prevFocusNode?.focus();
          break;
        default:
          break;
      }
    },
    [inputAutocomplete, prevFocusNode, setActiveItem],
  );

  /**
   * Handles click events for selecting autocomplete items.
   *
   * @function
   * @param {MouseEvent<HTMLLIElement>} event - The mouse event.
   * @returns {void}
   */
  const handleClick = useCallback(
    (event: MouseEvent<HTMLLIElement>): void => {
      event.preventDefault();
      event.stopPropagation();
      inputAutocomplete(event.currentTarget.textContent ?? '');
    },
    [inputAutocomplete],
  );

  /**
   * Renders the message at at the top of the Popover component.
   *
   * @function
   * @returns {(React.JSX.Element | null)} The rendered message in Popover component or null if not applicable.
   */
  const renderMessage = (): React.JSX.Element | null => {
    return errorState ? (
      <p className={style.popover__message}>
        {listOfError ? listOfError.map(([key]) => errorMessage?.[key as keyof typeof errorMessage]).join('\n') : null}
      </p>
    ) : null;
  };

  /**
   * Sets focus to the first or last item in the autocomplete list when it is updated.
   */
  useEffect(() => {
    const ulNode = ulRef.current;
    if (firstItemFocused === undefined || !ulNode) return;

    if (ulNode.childElementCount > 0) {
      const focusProperty = firstItemFocused ? 'firstElementChild' : 'lastElementChild';
      const elementToFocus = ulNode[focusProperty] as HTMLLIElement;
      activeItem.current = firstItemFocused ? 0 : ulNode.childElementCount - 1;
      if (elementToFocus) elementToFocus.focus();
    }
  }, [firstItemFocused]);

  return errorState || (autocompleteList && autocompleteList.length > 0) ? (
    <div className={style.popover}>
      {renderMessage()}
      <div
        className={classNames(style.popover__autocomplete, {
          [style['popover__autocomplete--disable']]: !autocompleteList,
        })}
      >
        <span className={style.popover__autocomplete__borderTop} />
        <ul className={style.popover__autocomplete__list} ref={ulRef}>
          {autocompleteList?.map((value) => (
            <li
              key={value}
              className={style.popover__autocomplete__list__item}
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
  ) : null;
}
