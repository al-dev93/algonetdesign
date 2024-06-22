import IonIcon from '@reacticons/ionicons';
import { KeyboardEvent, MouseEvent, useCallback, useEffect, useRef } from 'react';

import { ModalFormButton } from '@components/ModalFormButton';

import style from './style.module.css';
import { setFocusToElement } from './utils/setFocusToElement';

import type { ModalProps } from './types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {ModalProps} {
 *   children,
 *   open,
 *   setOpen,
 *   button,
 *   closeIcon,
 *   title,
 *   subTitle,
 *   closeParentModal,
 *   customStyle,
 * }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function Modal({
  children,
  open,
  setOpen,
  button,
  closeIcon,
  title,
  subTitle,
  closeParentModal,
  customStyle,
}: ModalProps): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const lastFormChildRef = useRef<HTMLTextAreaElement>();
  const shiftKeyRef = useRef<boolean>(false);

  /**
   * @description // TODO: add comment
   * @al-dev93
   */
  const setOpenFalse = useCallback(
    (event: KeyboardEvent | MouseEvent | Event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    },
    [setOpen],
  );
  // NOTE: Event handlers
  /**
   *
   * @description // TODO: add comment
   * @param {MouseEvent<HTMLButtonElement, globalThis.MouseEvent>} e
   * @return {*}  {void}
   * @al-dev93
   */
  const handleCloseClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => setOpenFalse(e);
  /**
   *
   * @description // TODO: add comment
   * @param {KeyboardEvent<HTMLButtonElement>} e
   * @return {*}  {void}
   * @al-dev93
   */
  const handleCloseKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.code === 'Enter') setOpenFalse(e);
  };
  /**
   *
   * @description // TODO: add comment
   * @param {KeyboardEvent<HTMLDivElement>} e
   * @return {*}  {void}
   * @al-dev93
   */
  const handleShiftKey = (e: KeyboardEvent<HTMLDivElement>): void => {
    const shiftKeyPress = shiftKeyRef.current;

    shiftKeyRef.current = (e.code === 'ShiftLeft' || e.code === 'ShiftLeft') && shiftKeyPress ? false : shiftKeyPress;
  };
  /**
   *
   * @description // TODO: add comment
   * @param {KeyboardEvent<HTMLDivElement>} e
   * @return {*}  {void}
   * @al-dev93
   */
  const handleTabIndex = (e: KeyboardEvent<HTMLDivElement>): void => {
    const focusElement = {
      first: closeRef.current,
      last: buttonRef.current?.disabled ? lastFormChildRef.current ?? null : buttonRef.current,
    };
    const shiftKeyPress = shiftKeyRef.current;

    if (focusElement.last) {
      shiftKeyRef.current = e.code === 'ShiftLeft' || e.code === 'ShiftLeft' ? true : shiftKeyPress;
      if (document.activeElement === focusElement[shiftKeyPress ? 'first' : 'last'] && e.code === 'Tab')
        setFocusToElement(e, focusElement[shiftKeyPress ? 'last' : 'first']);
      return;
    }
    if (e.code === 'Tab') setFocusToElement(e, focusElement.first);
  };

  // NOTE: hooks useEffect
  /**
   * @description // TODO: add comment
   * @al-dev93
   */
  useEffect(() => {
    /**
     *
     * @description // TODO: add comment
     * @param {globalThis.MouseEvent} e
     * @return {*}  {void}
     * @al-dev93
     */
    const handleOutsideClick = (e: globalThis.MouseEvent): void => {
      if (e.target === dialogRef.current) setOpenFalse(e);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [setOpenFalse]);

  /**
   * @description // TODO: add comment
   * @al-dev93
   */
  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (open) {
      lastFormChildRef.current = childrenRef.current?.getElementsByTagName('textarea').item(0) || undefined;
      dialogNode?.showModal();
      return;
    }
    dialogNode?.close();
    if (closeParentModal) closeParentModal((state) => !state);
  }, [closeParentModal, open]);

  /**
   * @description // TODO: add comment
   * @al-dev93
   */
  useEffect(() => {
    const dialogNode = dialogRef.current;

    /**
     *
     * @description // TODO: add comment
     * @param {Event} e
     * @return {*}  {void}
     * @al-dev93
     */
    const handleCancel = (e: Event): void => setOpenFalse(e);
    dialogNode?.addEventListener('cancel', handleCancel);
    return () => dialogNode?.removeEventListener('cancel', handleCancel);
  }, [setOpenFalse]);

  return (
    <dialog className={style.modal} ref={dialogRef}>
      <div
        className={`${style.modalWrapper} ${customStyle && style[customStyle]}`}
        role='presentation'
        onKeyDown={closeIcon || button ? handleTabIndex : undefined}
        onKeyUp={closeIcon && button ? handleShiftKey : undefined}
      >
        {(closeIcon || title || subTitle) && (
          <header className={style.modalHeader}>
            {closeIcon && (
              <button
                className={style.modalCloseButton}
                type='button'
                ref={closeRef}
                name='closeButton'
                onClick={handleCloseClick}
                onKeyDown={handleCloseKeyDown}
                tabIndex={0}
                aria-label='close modale'
              >
                <IonIcon className={customStyle && style[customStyle]} name='close' />
              </button>
            )}
            {(title || subTitle) && (
              <div className={style.modalTitleWrapper}>
                {title && <h3 className={style.modalTitle}>{title}</h3>}
                {subTitle && <p className={style.modalSlogan}>{subTitle}</p>}
              </div>
            )}
          </header>
        )}
        {open && (
          <div className={style.modalInnerWrapper} ref={childrenRef}>
            {children}
          </div>
        )}
        {button && (
          <footer className={style.modalFooter}>
            <ModalFormButton
              className={style.buttonForm}
              name={button.name}
              form={button.form}
              ref={buttonRef}
              disabled={button.disable}
            />
          </footer>
        )}
      </div>
    </dialog>
  );
}
