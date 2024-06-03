import { LegacyRef, forwardRef } from 'react';

import type { FormButtonProps } from './types';
/**
 *
 * @description // TODO: add comment
 * @param {FormButtonProps} props
 * @param {LegacyRef<HTMLButtonElement>} [ref]
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
function FormButtonRef(props: FormButtonProps, ref?: LegacyRef<HTMLButtonElement>): JSX.Element {
  const { className, form, onClick, name, disabled } = props;
  return (
    <button
      className={className}
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

export const FormButton = forwardRef(
  FormButtonRef as unknown as React.ForwardRefRenderFunction<HTMLButtonElement, FormButtonProps>,
);
