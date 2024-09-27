import IonIcon from '@reacticons/ionicons';
import classNames from 'classnames';
import React, { KeyboardEvent, MouseEvent, useCallback, useEffect, useRef } from 'react';

import { KeyboardEventButton, KeyboardEventDiv } from '@/types';
import { ModalFormButton } from '@components/ModalFormButton';

import style from './style.module.css';

import type { ModalProps } from './types';

/**
 * Set focus to the specified HTML or SVG element and prevents the default event behavior.
 * Useful in keyboard navigation and accessibility scenarios where focus management is required.
 *
 * @param {KeyboardEventDiv} event - The keyboard event that triggers the focus change.
 * @param {(HTMLElement | SVGSVGElement | null)} element - The target element to focus on.
 * Can be an HTML element, an SVG element, or null.
 * @returns {void}
 *
 * @al-dev93
 */
function setFocusToElement(event: KeyboardEventDiv, element: HTMLElement | SVGSVGElement | null): void {
  event.preventDefault();
  event.stopPropagation();
  element?.focus();
}

/**
 * Modal component that display a modal dialog.
 *
 * @component
 * @param {ModalProps} props - The properties for the Modal component.
 * @property {ReactNode} children - The children elements to display inside the modal.
 * @property {string} [className] - Additonal class names to apply to the modal.
 * @property {boolean} open - Indicates whether the modal is open.
 * @property {SetStateBoolean} setOpen - Function to set the open state of the modal.
 * @property {ModalButton} [button] - The button configuration for the modal.
 * @property {boolean} [closeIcon] - Indicates if there is a modal close button.
 * @property {string} [title] - The title of the modal.
 * @property {string} [subtitle] - The subtitle of the modal.
 * @property {boolean} [onRenderComplete] - A flag to warm if a child component is rendered.
 * @property {SetStateBoolean} [closeParentModal] - Function to close the parent modal.
 * @property {'alert'} [customStyle] - Custom style for the modal.
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
  onRenderComplete,
  closeParentModal,
  customStyle,
}: ModalProps): React.JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const lastFormChildRef = useRef<HTMLTextAreaElement>();

  /**
   * Closes the modal and prevents the event from propagating.
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
   * Handles the click event on the close button.
   *
   * @param {MouseEvent<HTMLButtonElement>} e - The mouse event.
   */
  const handleCloseClick = (e: MouseEvent<HTMLButtonElement>): void => setOpenFalse(e);

  /**
   * Handles the key down event on the close button.
   *
   * @param {KeyboardEventButton} e - The keyboard event.
   */
  const handleCloseKeyDown = (e: KeyboardEventButton): void => {
    if (e.code === 'Enter') setOpenFalse(e);
  };

  /**
   * Handles the tab navigation in the modal.
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
   * Handles the closing of the modal when a click is made outside of it.
   */
  useEffect(() => {
    /**
     * Handles the click outside Modal.
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
   * Handles the opening and closing of the modal.
   */
  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (open) {
      lastFormChildRef.current = childrenRef.current?.getElementsByTagName('textarea').item(0) || undefined;
      if (onRenderComplete === true || onRenderComplete === undefined) dialogNode?.showModal();
    } else {
      dialogNode?.close();
      if (closeParentModal) closeParentModal((state) => !state);
    }
  }, [closeParentModal, onRenderComplete, open]);

  /**
   * Handles cancellation of the modal (possible 'esc' or other native cancellation).
   */
  useEffect(() => {
    const dialogNode = dialogRef.current;

    /**
     * Handles the cancel event.
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
