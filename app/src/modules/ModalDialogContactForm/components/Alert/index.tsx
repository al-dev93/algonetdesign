import React, { memo } from 'react';

import { Modal } from '@components/Modal';

import style from './style.module.css';

import type { AlertProps } from '../../types';

/**
 * Alert component that displays an alert message in a modal dialog. The alert can contain either a single message
 * or an array of messages.
 * Alert component memoized with 'React.memo' to prevent unnecessary re-render. The component will only re-render
 * when its props change.
 *
 * @component
 * @param {AlertProps} props - The properties for the Alert component.
 * @property {boolean} openAlert - A boolean that controls whether the alert modal is open.
 * @property {SetStateBoolean} setOpenAlert - A function to toggle the open/close state of the alert modal.
 * @property {(string | string[])} message - The message(s) to display in the alert. Can be a string or an array of strings.
 * @property {SetStateBoolean} [closeParentModal] - A function to close the parent modal, if necessary (optional).
 * @returns {React.JSX.Element} The rendered Alert component.
 *
 * @al-dev93
 */
function MemoizedAlert({ openAlert, setOpenAlert, message, closeParentModal }: AlertProps): React.JSX.Element {
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

export const Alert = memo(MemoizedAlert);
