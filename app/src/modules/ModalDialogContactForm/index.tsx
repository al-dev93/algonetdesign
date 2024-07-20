import { FormEvent, useEffect, useReducer, useRef, useState } from 'react';

import { Modal } from '@components/Modal';
import { useFetchData } from '@hooks/useFetchData';

import { Alert } from './components/Alert';
import { DialogFormInput } from './components/DialogFormInput';
import { createContactFormInitialState } from './reducer/modalDialogContactFormInitialState';
import { modalDialogContactFormReducer } from './reducer/modalDialogContactFormReducer';
import style from './style.module.css';
import { EMPTY_MODAL_DIALOG_CONTACT_FORM, INIT_DIALOG_CONTACT_FORM_STATE } from './utils/constants';
import { getSubmitData } from './utils/formHelpers';

import type { ModalDialogContactFormProps } from './types';
import type { ContactFormInput, ContactFormModal, TooltipContent } from '@/types';

/**
 *
 * A modal dialog containing a contact form.
 *
 * this component either uses the provided `data` prop or fetches data from the
 * specified `url`
 *
 * @function ModalDialogContactForm
 * @param {ModalDialogContactFormProps} {
 *   open,
 *   setOpen,
 *   data: contactFormModal,
 *   url,
 * }
 * @return {*}  {JSX.Element}
 * @exports
 * @al-dev93
 */
export function ModalDialogContactForm({
  open,
  setOpen,
  data: contactFormModal,
  url,
}: ModalDialogContactFormProps): JSX.Element {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const modalVisibility = useRef<boolean>();
  const isInitializedStateRef = useRef<boolean>();
  // COMMENT: determine if we should fetch data based on the presence of buttons
  const shouldFetch = !contactFormModal;
  // COMMENT: only use useFetch if shouldFetch is true
  const { data: fetchedData } = useFetchData(shouldFetch ? url : null, { method: 'GET' });
  // TODO: otherwise use buttons ... complete
  const {
    id: idForm,
    url: urlInput,
    title,
    subtitle,
    submitButtonName,
    alertOnSubmit,
  } = contactFormModal || (fetchedData?.at(0) as ContactFormModal) || EMPTY_MODAL_DIALOG_CONTACT_FORM;

  const { data: fetchedInputData } = useFetchData(urlInput, { method: 'GET' });
  const data = fetchedInputData as ContactFormInput[] | null;

  const [contactFormState, contactFormDispatch] = useReducer(
    modalDialogContactFormReducer,
    [],
    createContactFormInitialState,
  );

  useEffect(() => {
    const isInitializedState = isInitializedStateRef.current;
    if (data && !isInitializedState) {
      contactFormDispatch({ type: INIT_DIALOG_CONTACT_FORM_STATE, payload: data.map((item) => item.id) });
      isInitializedStateRef.current = true;
    }
  }, [data]);

  useEffect(() => {
    const isVisible = modalVisibility.current;
    if (open && !openAlert && isVisible !== undefined) {
      modalVisibility.current = isVisible ? undefined : true;
      return;
    }
    if (open && openAlert) modalVisibility.current = false;
  }, [open, openAlert]);

  console.log(contactFormState);
  // console.log(alertOnSubmit);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    setOpenAlert(true);
    const validValues = getSubmitData(contactFormState);
    if (validValues) console.log(validValues);
  };

  return (
    <Modal
      open={open}
      className={modalVisibility.current ? style.hiddenVisibility : undefined}
      setOpen={setOpen}
      title={title}
      subTitle={subtitle}
      closeIcon
      button={{
        name: submitButtonName,
        form: idForm,
        disable: Object.keys(contactFormState).some((item) => !!contactFormState[item].inputError),
      }}
    >
      <Alert openAlert={openAlert} setOpenAlert={setOpenAlert} message={alertOnSubmit} closeParentModal={setOpen} />
      <form action='' id={idForm} className={style.contactForm} method='dialog' onSubmit={handleSubmit} noValidate>
        {data?.map(({ id, input, label, tooltipContent }) => (
          <DialogFormInput
            key={id}
            label={label}
            name={id}
            input={input}
            tooltipContent={tooltipContent as TooltipContent[] | undefined}
            state={contactFormState}
            dispatch={contactFormDispatch}
          />
        ))}
      </form>
    </Modal>
  );
}
