import { LegacyRef, forwardRef, memo } from 'react';

import style from './style.module.css';

import type { FormButtonProps } from './types';

/**
 *
 * @description // TODO: add comment
 * @param {FormButtonProps} props
 * @param {LegacyRef<HTMLButtonElement>} [ref]
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
function MemoizedModalFormButtonRef(props: FormButtonProps, ref?: LegacyRef<HTMLButtonElement>): JSX.Element {
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

export const ModalFormButton = memo(
  forwardRef(
    MemoizedModalFormButtonRef as unknown as React.ForwardRefRenderFunction<HTMLButtonElement, FormButtonProps>,
  ),
);
