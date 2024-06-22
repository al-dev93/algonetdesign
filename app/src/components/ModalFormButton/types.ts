import type { MouseEventHandler } from 'react';

export type FormButtonProps = {
  className?: string;
  form?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  name: string;
  disabled?: boolean;
};
