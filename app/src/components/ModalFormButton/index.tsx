import React, { LegacyRef, forwardRef, memo } from 'react';

import style from './style.module.css';

import type { FormButtonProps } from './types';

/**
 * ModalFormButton component that renders a button for open modal or for forms,
 * with memoization and ref forwarding.
 *
 * @component
 * @param {FormButtonProps} props - The properties for the ModalFormButton component.
 * @property {string} [className] - Additional class names to apply to the button.
 * @property {string} [form] - The ID of the form the button is associated with.
 * @property {MouseEventButton} [onClick] - Click event handler for the button.
 * @property {string} name - The text content of the button.
 * @property {boolean} [disabled] - Indicates whether the button is disabled.
 *
 * @param {LegacyRef<HTMLButtonElement>} [ref] - The ref to forward the button element.
 * @returns {React.JSX.Element} The rendered button component.
 *
 * @al-dev93
 */
function MemoizedModalFormButtonRef(props: FormButtonProps, ref?: LegacyRef<HTMLButtonElement>): React.JSX.Element {
  const { className, form, onClick, name, disabled } = props;
  return (
    <button
      className={`${style.appButton} ${className}`}
      form={form}
      type={form ? 'submit' : 'button'}
      onClick={onClick}
      ref={ref}
      disabled={disabled}
    >
      {name}
    </button>
  );
}

export const ModalFormButton = memo(forwardRef(MemoizedModalFormButtonRef));
