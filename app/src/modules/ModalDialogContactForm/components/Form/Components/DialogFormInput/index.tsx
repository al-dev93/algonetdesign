import IonIcon from '@reacticons/ionicons';
import classNames from 'classnames';
import React, { LegacyRef, useCallback, useMemo, useRef, useState } from 'react';

import { DynamicElement } from '@components/DynamicElement';
import { Tag } from '@components/Tag';
import { Tooltip } from '@components/Tooltip';

import style from './style.module.css';
import { useContactForm } from '../../../../hooks/useContactForm';
import { Popover } from '../../../Popover';

import type { DialogFormInputProps } from '../../../../types';
import type { DialogFormInputElement } from '@/types';

/**
 * DialogFormInput component for rendering input elements within a form.
 * This component includes labels, tooltips error tags, and autocomplete popovers.
 *
 * @component
 * @param {DialogFormInputProps} props - The properties for the DialogFormInput component.
 * @property {Dispatch<ModalDialogContactFormAction>} dispatch - the dispatch function to handle actions related to the modal
 * dialog contact form
 * @property {FormInput} input - the definition of thr input or textarea element of the form
 * @property {string} label - the label for the input element
 * @property {string} name - the nameattribute for the input element
 * @property {ModalDialogContactFormState} state - the current state of the modal dialog contact form
 * @property {TooltipContent[]} [tooltipContent] - content for tooltips associated with the input element (optional)
 * @returns {React.JSX.Element} The rendered DialogFormInput component.
 *
 * @al-dev93
 */
export function DialogFormInput({
  dispatch,
  input,
  label,
  name,
  state,
  tooltipContent,
}: DialogFormInputProps): React.JSX.Element {
  const inputElementRef = useRef<DialogFormInputElement>(null);
  const [setInputAutocomplete] = useContactForm(inputElementRef, dispatch);
  const [isTooltipActive, setIsTooltipActive] = useState<boolean>(false);

  /**
   * Memoizes the current state of the specified form field to avoid unnecessary recalculations
   * and to ensure that field properties are only recomputed when 'name' or 'state' changes.
   * This helps optimize the performance by preventing re-renders unless the dependancies change.
   *
   * @constant
   * @type {FieldState}
   * @param {ModalDialogContactFormState} state - The global state of the form containing all fields.
   * @param {string} name - The name of the specific field in the form.
   * @returns {FieldState} The current state of the specified field.
   */
  const fieldState = useMemo(() => state[name], [name, state]);

  /**
   * Handles setting the autocomplete input.
   *
   * @function
   * @param {string} value - The autocomplete value to set.
   * @returns {void}
   */
  const handleSetInputAutocomplete = useCallback(
    (value: string) => {
      setInputAutocomplete(value);
    },
    [setInputAutocomplete],
  );

  /**
   * Handles the visibility of the tooltip by setting the tooltip's active state.
   * This function can be used for events like mouse enter, mouse leave, focus and blur.
   *
   * @function
   * @param {boolean} visible - Indicates whether the tooltip should be visible (true) or hidden (false).
   * @returns {void}
   */
  const handleTooltipVisibility = (visible: boolean): void => {
    setIsTooltipActive(visible);
  };

  /**
   * Renders the tooltip component if the input is required and tooltip content is provided.
   *
   * @function
   * @returns {(React.JSX.Element | null)} The rendered Tooltip component or null if not applicable.
   */
  const renderTooltip = (): React.JSX.Element | null => {
    return input.required && tooltipContent ? (
      <Tooltip content={tooltipContent} direction='right' forceActive={isTooltipActive} aria-label='tooltip'>
        <IonIcon name='information-circle' />
      </Tooltip>
    ) : null;
  };

  /**
   * Renders the Tag component if an error atatus tag is present in the state.
   *
   * @function
   * @returns {(React.JSX.Element | null)} The rendered Tag component or null if not applicable.
   */
  const renderTag = (): React.JSX.Element | null => {
    return fieldState.inputStatusTag ? (
      <Tag
        className={classNames({
          [style['dialogFormInput__alertTag--message']]: input.tag === 'textarea',
          [style.dialogFormInput__alertTag]: input.tag !== 'textarea',
        })}
        type='alerted'
        tag={fieldState.inputStatusTag}
      />
    ) : null;
  };

  /**
   * Renders the Popover component if the input is focused and autocomplete data is available.
   *
   * @function
   * @returns {(React.JSX.Element | null)} The rendered Popover component or null if not applicable.
   */
  const renderPopover = (): React.JSX.Element | null => {
    return fieldState.isFocused ? (
      <Popover
        autocompleteList={fieldState.autoComplete}
        errorMessage={input.error}
        errorState={fieldState.inputError}
        firstItemFocused={fieldState.overlayFirstItemFocus}
        inputAutocomplete={handleSetInputAutocomplete}
        prevFocusNode={inputElementRef.current}
      />
    ) : null;
  };

  return (
    <div className={style.dialogFormComponent}>
      <div
        className={classNames(style.dialogFormInput, {
          [style[`dialogFormInput--${fieldState.inputBorderBox}`]]: fieldState.inputBorderBox,
        })}
        onMouseEnter={() => handleTooltipVisibility(true)}
        onMouseLeave={() => handleTooltipVisibility(false)}
        onFocus={() => handleTooltipVisibility(true)}
        onBlur={() => handleTooltipVisibility(false)}
      >
        <div className={style.dialogFormInput__label}>
          <label className={style.dialogFormInput__label__content} htmlFor={name}>
            {label}
          </label>
          {renderTooltip()}
        </div>

        <DynamicElement
          className={classNames(style.dialogFormInput__inputBox, {
            [style['dialogFormInput__inputBox--textArea']]: input.tag !== 'input',
          })}
          tag={input.tag}
          type={input.type}
          name={name}
          id={name}
          minLength={input.minLength}
          pattern={input.pattern}
          placeholder={input.placeholder}
          required={input.required}
          autoComplete='off'
          ref={inputElementRef as LegacyRef<DialogFormInputElement>}
        />
        {renderTag()}
        {renderPopover()}
      </div>
    </div>
  );
}
