import IonIcon from '@reacticons/ionicons';
import classNames from 'classnames';
import React, { KeyboardEvent, MouseEvent, useCallback, useEffect, useRef } from 'react';

import { KeyboardEventButton, KeyboardEventDiv } from '@/types';
import { ModalFormButton } from '@components/ModalFormButton';

import style from './style.module.css';

import type { ModalProps } from './types';

/**
 * @description Stops the propagation of the triggering keyboard event and transferring focus.
 *
 * @param {KeyboardEventDiv} event - The keyboard event whose propagation is stopped.
 * @param {(HTMLElement | SVGSVGElement | null)} element - The element that takes focus.
 *
 * @al-dev93
 */
function setFocusToElement(event: KeyboardEventDiv, element: HTMLElement | SVGSVGElement | null): void {
  event.preventDefault();
  event.stopPropagation();
  element?.focus();
}

/**
 * @description Modal component that display a modal dialog.
 *
 * @param {ModalProps} props - The properties for the Modal component.
 * @returns {React.JSX.Element} The rendered modal component.
 *
 * @al-dev93
 */
export function Modal({
  children,
  className,
  open,
  setOpen,
  button,
  closeIcon,
  title,
  subtitle,
  closeParentModal,
  customStyle,
}: ModalProps): React.JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const lastFormChildRef = useRef<HTMLTextAreaElement>();

  /**
   * @description Closes the modal and prevents the event from propagating.
   *
   * @param {KeyboardEvent | MouseEvent | Event} event - The trigger event.
   */
  const setOpenFalse = useCallback(
    (event: KeyboardEvent | MouseEvent | Event): void => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    },
    [setOpen],
  );

  /**
   * @description Handles the click event on the close button.
   *
   * @param {MouseEvent<HTMLButtonElement>} e - The mouse event.
   */
  const handleCloseClick = (e: MouseEvent<HTMLButtonElement>): void => setOpenFalse(e);

  /**
   * @description Handles the key down event on the close button.
   *
   * @param {KeyboardEventButton} e - The keyboard event.
   */
  const handleCloseKeyDown = (e: KeyboardEventButton): void => {
    if (e.code === 'Enter') setOpenFalse(e);
  };

  /**
   * @description Handles the tab navigation in the modal.
   *
   * @param {KeyboardEventDiv} e - The keyboard event.
   */
  const handleTabIndex = (e: KeyboardEventDiv): void => {
    const focusElement = {
      first: closeRef.current,
      last: buttonRef.current?.disabled ? lastFormChildRef.current ?? null : buttonRef.current,
    };

    if (document.activeElement === (e.shiftKey ? focusElement.first : focusElement.last) && e.code === 'Tab') {
      setFocusToElement(e, e.shiftKey ? focusElement.last : focusElement.first);
    }
  };

  /**
   * @description Handles the closing of the modal when a click is made outside of it.
   */
  useEffect(() => {
    /**
     * @description Handles the click outside Modal.
     *
     * @param {Event} e - The trigger event.
     */
    const handleOutsideClick = (e: Event): void => {
      if (e.target === dialogRef.current) setOpenFalse(e);
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [setOpenFalse]);

  /**
   * @description Handles the opening and closing of the modal.
   */
  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (open) {
      lastFormChildRef.current = childrenRef.current?.getElementsByTagName('textarea').item(0) || undefined;
      dialogNode?.showModal();
    } else {
      dialogNode?.close();
      if (closeParentModal) closeParentModal((state) => !state);
    }
  }, [closeParentModal, open]);

  /**
   * @description Handles cancellation of the modal (possible 'esc' or other native cancellation).
   */
  useEffect(() => {
    const dialogNode = dialogRef.current;

    /**
     * @description Handles the cancel event.
     *
     * @param {Event} e - The cancel event.
     */
    const handleCancel = (e: Event): void => setOpenFalse(e);

    dialogNode?.addEventListener('cancel', handleCancel);
    return () => dialogNode?.removeEventListener('cancel', handleCancel);
  }, [setOpenFalse]);

  // Combine the custom style and className using classNames library
  const modalClassName = classNames(style.modal, className, {
    [style['modal--hidden']]: !open,
  });
  const wrapperClassName = classNames(style.modal__wrapper, customStyle && style[`modal__wrapper--${customStyle}`]);
  const closeButtonClassName = classNames(
    style.modal__closeButton,
    customStyle && style[`modal__closeButton--${customStyle}`],
  );

  return (
    <dialog
      className={modalClassName}
      ref={dialogRef}
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={subtitle ? 'modal-description' : undefined}
    >
      <div
        className={wrapperClassName}
        role='presentation'
        onKeyDown={closeIcon || button ? handleTabIndex : undefined}
      >
        {(closeIcon || title || subtitle) && (
          <header className={style.modal__header}>
            {closeIcon && (
              <button
                className={closeButtonClassName}
                type='button'
                ref={closeRef}
                name='closeButton'
                onClick={handleCloseClick}
                onKeyDown={handleCloseKeyDown}
                tabIndex={0}
                aria-label='close modal'
              >
                <IonIcon name='close' />
              </button>
            )}
            {(title || subtitle) && (
              <div className={style.modal__titleWrapper}>
                {title && (
                  <h3 id='modal-title' className={style.modal__title}>
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p id='modal-description' className={style.modal__slogan}>
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </header>
        )}
        {open && (
          <div className={style.modal__innerWrapper} ref={childrenRef}>
            {children}
          </div>
        )}
        {button && (
          <footer className={style.modal__footer}>
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
