import { LegacyRef, forwardRef } from 'react';

import { FormButtonProps } from './types';

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
