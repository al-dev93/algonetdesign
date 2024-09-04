import React from 'react';

import { Modal } from '@components/Modal';

import style from './style.module.css';

import type { AlertProps } from '../../types';

/**
 * @description Alert component to display alert message inside a modal.
 *
 * @param {AlertProps} props - The properties for the Alert component.
 * @returns {React.JSX.Element} The rendered Alert component.
 *
 * @al-dev93
 */
export function Alert({ openAlert, setOpenAlert, message, closeParentModal }: AlertProps): React.JSX.Element {
  return (
    <Modal open={openAlert} setOpen={setOpenAlert} closeIcon closeParentModal={closeParentModal} customStyle='alert'>
      <div className={style.wrapperAlert}>
        {Array.isArray(message) ? (
          message.map((value, index) => (
            <span key={`id-${index + 1}`} className={style.bodyAlert}>
              {value}
            </span>
          ))
        ) : (
          <span className={style.alert}>{message}</span>
        )}
      </div>
    </Modal>
  );
}
