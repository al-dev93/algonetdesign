import IonIcon from '@reacticons/ionicons';
import { LegacyRef, useRef } from 'react';

import { DialogFormInputElement } from '@/types';
import { DynamicElement } from '@components/DynamicElement';
import { Tag } from '@components/Tag';
import { Tooltip } from '@components/Tooltip';

import style from './style.module.css';
import { useContactForm } from '../../hooks/useContactForm';
import { Popover } from '../Popover';

import type { DialogFormInputProps } from '../../types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {DialogFormInputProps} {
 *   dispatch,
 *   input,
 *   label,
 *   name,
 *   state,
 *   tooltipContent,
 * }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function DialogFormInput({
  dispatch,
  input,
  label,
  name,
  state,
  tooltipContent,
}: DialogFormInputProps): JSX.Element {
  const inputElementRef = useRef<DialogFormInputElement>(null);
  const [setInputAutocomplete] = useContactForm(inputElementRef, dispatch);
  // console.log(state);

  return (
    <div className={style.inputFormWrapper}>
      {
        <div className={`${style.inputContainer} ${style[state[name].inputBorderBox as string]}`}>
          <div className={style.labelContainer}>
            <label className={style.label} htmlFor={name}>
              {label}
            </label>
            {input.required && tooltipContent && (
              <Tooltip content={tooltipContent} direction='right'>
                <IonIcon name='information-circle' />
              </Tooltip>
            )}
          </div>

          <DynamicElement
            tag={input.tag}
            className={`${style.inputBox} ${input.tag === 'input' ? '' : style.textArea}`}
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

          {state[name].inputStatusTag && (
            <Tag
              type='error'
              tag={state[name].inputStatusTag}
              // FIXME: utiliser une classe css et supprimer cette prop
              position={input.id === 'message' ? { bottom: 0, left: '10px' } : { bottom: 0, right: '10px' }}
            />
          )}
          {state[name].isFocused && (
            <Popover
              autocompleteList={state[name].autoComplete}
              errorMessage={input.error}
              errorState={state[name].inputError}
              firstItemFocused={state[name].overlayFirstItemFocus}
              inputAutocomplete={setInputAutocomplete}
              prevFocusNode={inputElementRef.current}
            />
          )}
        </div>
      }
    </div>
  );
}
