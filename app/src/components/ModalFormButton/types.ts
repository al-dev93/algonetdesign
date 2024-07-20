import { MouseEventButton } from '@/types';

export type FormButtonProps = {
  className?: string;
  form?: string;
  onClick?: MouseEventButton;
  name: string;
  disabled?: boolean;
};
