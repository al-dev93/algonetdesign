import IonIcon from '@reacticons/ionicons';
import classNames from 'classnames';
import React, { LegacyRef, useCallback, useRef, useState } from 'react';

import { DynamicElement } from '@components/DynamicElement';
import { Tag } from '@components/Tag';
import { Tooltip } from '@components/Tooltip';

import style from './style.module.css';
import { useContactForm } from '../../hooks/useContactForm';
import { Popover } from '../Popover';

import type { DialogFormInputProps } from '../../types';
import type { DialogFormInputElement } from '@/types';

/**
 * @description DialogFormInput component for rendering input elements within a form.
 * This component includes labels, tooltips error tags, and autocomplete popovers.
 *
 * @param {DialogFormInputProps} props - The properties for the DialogFormInput component.
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
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  /**
   * @description Handles setting the autocomplete input.
   *
   * @param {string} value - The autocomplete value to set.
   */
  const handleSetInputAutocomplete = useCallback(
    (value: string) => {
      setInputAutocomplete(value);
    },
    [setInputAutocomplete],
  );

  const showTooltip = useCallback(() => {
    setIsTooltipActive(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setIsTooltipActive(false);
  }, []);
  /**
   * @description Renders the tooltip component if the input is required and tooltip content is provided.
   *
   * @returns {(React.JSX.Element | null)} The rendered Tooltip component or null if not applicable.
   *
   * @al-dev93
   */
  const renderTooltip = (): React.JSX.Element | null => {
    return input.required && tooltipContent ? (
      <Tooltip content={tooltipContent} direction='right' forceActive={isTooltipActive} aria-label='tooltip'>
        <IonIcon name='information-circle' />
      </Tooltip>
    ) : null;
  };
  /**
   * @description Renders the Tag component if an error atatus tag is present in the state.
   *
   * @returns {(React.JSX.Element | null)} The rendered Tag component or null if not applicable.
   *
   * @al-dev93
   */
  const renderTag = (): React.JSX.Element | null => {
    return state[name].inputStatusTag ? (
      <Tag
        className={classNames({
          [style['dialogFormInput__alertTag--message']]: input.tag === 'textarea',
          [style.dialogFormInput__alertTag]: input.tag !== 'textarea',
        })}
        type='alerted'
        tag={state[name].inputStatusTag}
      />
    ) : null;
  };
  /**
   * @description Renders the Popover component if the input is focused and autocomplete data is available.
   *
   * @returns {(React.JSX.Element | null)} The rendered Popover component or null if not applicable.
   *
   * @al-dev93
   */
  const renderPopover = (): React.JSX.Element | null => {
    return state[name].isFocused ? (
      <Popover
        autocompleteList={state[name].autoComplete}
        errorMessage={input.error}
        errorState={state[name].inputError}
        firstItemFocused={state[name].overlayFirstItemFocus}
        inputAutocomplete={handleSetInputAutocomplete}
        prevFocusNode={inputElementRef.current}
      />
    ) : null;
  };

  console.log(input.id);
  return (
    <div className={style.dialogFormComponent}>
      <div
        className={classNames(style.dialogFormInput, {
          [style[`dialogFormInput--${state[name].inputBorderBox}`]]: state[name].inputBorderBox,
        })}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
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
