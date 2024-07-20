import { Modal } from '@components/Modal';

import style from './style.module.css';
import { AlertProps } from '../../types';

/**
 *
 * @function Alert
 * @param {AlertProps} { openAlert, setOpenAlert, message, closeParentModal }
 * @return {*}  {JSX.Element}
 * @exports
 * @al-dev93
 */
export function Alert({ openAlert, setOpenAlert, message, closeParentModal }: AlertProps): JSX.Element {
  return (
    <Modal open={openAlert} setOpen={setOpenAlert} closeIcon closeParentModal={closeParentModal} customStyle='alert'>
      <div className={style.alertWrapper}>
        {(Array.isArray(message) &&
          message.map((value, index) => (
            <span key={`${index + 1}`} className={style.alert}>
              {value}
            </span>
          ))) || <span className={style.alert}>{message}</span>}
      </div>
    </Modal>
  );
}
