import { MouseEventHandler, ReactNode } from 'react';

import { SetStateBoolean } from '@/types';

export type ModalButton = {
  name: string;
  form?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disable?: boolean;
};

export type ModalProps = {
  children: ReactNode;
  open: boolean;
  setOpen: SetStateBoolean;
  button?: ModalButton;
  closeIcon?: boolean;
  title?: string;
  subTitle?: string;
  closeParentModal?: SetStateBoolean;
  customStyle?: 'alert';
};
