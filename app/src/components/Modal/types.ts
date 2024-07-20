import { ReactNode } from 'react';

import { MouseEventButton, SetStateBoolean } from '@/types';

export type ModalButton = {
  name: string;
  form?: string;
  onClick?: MouseEventButton;
  disable?: boolean;
};

export type ModalProps = {
  children: ReactNode;
  className?: string;
  open: boolean;
  setOpen: SetStateBoolean;
  closeIcon?: boolean;
} & (
  | {
      button?: ModalButton;
      title?: string;
      subTitle?: string;
      closeParentModal?: never;
      customStyle?: never;
    }
  | {
      button?: ModalButton;
      title?: never;
      subTitle?: never;
      closeParentModal?: SetStateBoolean;
      customStyle: 'alert';
    }
);
