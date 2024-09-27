import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { Modal } from '@components/Modal';
import { useFetchData } from '@hooks/useFetchData';

import { Alert } from './components/Alert';
import { Form } from './components/Form';
import { createContactFormInitialState } from './reducer/modalDialogContactFormInitialState';
import { modalDialogContactFormReducer } from './reducer/modalDialogContactFormReducer';
import style from './style.module.css';
import { EMPTY_MODAL_DIALOG_CONTACT_FORM } from './utils/constants';
import { hasFormErrors, manageModalVisibility } from './utils/formHelpers';

import type { ModalDialogContactFormProps } from './types';
import type { ContactFormInput, ContactFormModal, SetStateBoolean } from '@/types';

/**
 * Renders a modal dialog containing a contact form. The form can either be populated
 * with provided data or fetched dynamically from a specified URL. It manages from validation,
 * submission, and the display of alert messages.
 *
 * @component
 * @param {ModalDialogContactFormProps} props - The props for the ModalDialogContactForm component.
 * @property {boolean} open - Boolean to control the visibility of the modal.
 * @property {SetStateBoolean} setOpen - Function to toggle the open state of the modal.
 * @property {ContactFormModal} [data] - Predefined form data to populate the form (optional).
 * @property {string} [url] - URL to fetch the form data if 'data' is not provided (optional).
 *
 * @returns {React.JSX.Element} The rendered modal contact form
 *
 * @al-dev93
 */
export function ModalDialogContactForm({
  open,
  setOpen,
  data: contactFormModal,
  url,
}: ModalDialogContactFormProps): React.JSX.Element {
  const [isFormContentRendered, setIsFormContentRendered] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const modalVisibility = useRef<boolean>();

  // Determine if data needs to be fetched
  const shouldFetch = !contactFormModal;

  // Fetch form modal data
  const { data } = useFetchData(shouldFetch ? url : null, { method: 'GET' });
  const [modalContent, formContent] = data || [];

  /**
   * Memoizes the function to update the 'isFormContentRendered' state to avoid recreating it on every render.
   *
   * @function
   * @param {boolean} rendered - Indicates whether the form content has been rendered.
   * @returns {void}
   */
  const setIsFormContentRenderedCallback = useCallback((rendered: boolean) => {
    setIsFormContentRendered(rendered);
  }, []) as SetStateBoolean;

  /**
   * Memoizes the function to set the alert's open state to avoid recreating it on every render.
   *
   * @function
   * @param {boolean} isOpen - Indicates whether the alert should be open.
   * @returns {void}
   */
  const setOpenAlertCallback = useCallback((isOpen: boolean) => {
    setOpenAlert(isOpen);
  }, []) as SetStateBoolean;

  /**
   * Memoizes the function to manage the modal open state to avoid recreating it on every render.
   *
   * @function
   * @param {boolean} isOpen - Indicates whether the modal should be open or closed.
   * @returns {void}
   */
  const setOpenModal = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
    },
    [setOpen],
  ) as SetStateBoolean;

  /**
   * Extract form modal data from either fetched or provided props.
   * Memoizes the data to avoid recalculating it on every render.
   *
   * @constant
   * @type {Object}
   * @property {string} id - The form id.
   * @property {string} urlFormContent - The URL to fetch the form content.
   * @property {string} urlApi - The URL to communicate with the API.
   * @property {string} title - The form title.
   * @property {string} subtitle - The form subtitle.
   * @property {string} submitButtonName - The submit button text.
   * @property {string[]} alertOnSubmit - The message entered in the alert modal.
   */
  const {
    id: idForm,
    urlApi,
    title,
    subtitle,
    submitButtonName,
    alertOnSubmit,
  } = useMemo(
    () => contactFormModal || (modalContent as ContactFormModal[])?.at(0) || EMPTY_MODAL_DIALOG_CONTACT_FORM,
    [contactFormModal, modalContent],
  );

  // Initialize reducer for contact form state management
  const [contactFormState, contactFormDispatch] = useReducer(
    modalDialogContactFormReducer,
    [],
    createContactFormInitialState,
  );

  /**
   * Toggles the modal's visibility based on the current modal state and alert status.
   * Ensures that the modal is hidden when an alert is shown and displayed otherwise
   */
  useEffect(() => {
    manageModalVisibility(open, openAlert, modalVisibility);
  }, [isFormContentRendered, open, openAlert]);

  /**
   * Resets the flag indicating that the form content is rendered when the
   * contact form is closed.
   */
  useEffect(() => {
    if (!open && isFormContentRendered) setIsFormContentRendered(false);
  }, [isFormContentRendered, open]);

  return (
    <Modal
      open={open}
      className={modalVisibility.current ? style.hiddenVisibility : undefined}
      setOpen={setOpenModal}
      title={title}
      subtitle={subtitle}
      onRenderComplete={isFormContentRendered}
      closeIcon
      button={{
        name: submitButtonName,
        form: idForm,
        disable: hasFormErrors(contactFormState),
      }}
    >
      <Alert
        openAlert={openAlert}
        setOpenAlert={setOpenAlertCallback}
        message={alertOnSubmit}
        closeParentModal={setOpenModal}
      />
      <Form
        idForm={idForm}
        urlApi={urlApi}
        dataFormContent={formContent as ContactFormInput[]}
        state={contactFormState}
        dispatch={contactFormDispatch}
        setOpenAlert={setOpenAlertCallback}
        onRenderComplete={setIsFormContentRenderedCallback}
      />
    </Modal>
  );
}
