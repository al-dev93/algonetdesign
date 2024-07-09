import { useReducer } from 'react';

import { Modal } from '@components/Modal';
import { useFetchData } from '@hooks/useFetchData';

import { DialogFormInput } from './components/DialogFormInput';
import { modalDialogContactFormInitialState } from './reducer/modalDialogContactFormInitialState';
import { modalDialogContactFormReducer } from './reducer/modalDialogContactFormReducer';
import style from './style.module.css';
import { EMPTY_DIALOG_FORM_INPUT, EMPTY_MODAL_DIALOG_CONTACT_FORM } from './utils/constants';

import type { ModalDialogContactFormProps } from './types';
import type { ContactFormInput, ContactFormModal, TooltipContent } from '@/types';

export function ModalDialogContactForm({ open, setOpen, data: contactFormModal, url }: ModalDialogContactFormProps) {
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
  const data = (fetchedInputData as ContactFormInput[]) || EMPTY_DIALOG_FORM_INPUT;

  const [contactFormState, contactFormDispatch] = useReducer(
    modalDialogContactFormReducer,
    modalDialogContactFormInitialState,
  );

  // console.log(alertOnSubmit);
  // console.log(data);
  // console.log(contactFormState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    // if (!validity?.length) {
    //   setOpenAlert(true);
    //   // COMMENT
    //   //  eslint-disable-next-line no-console
    //   console.log(inputValue);
    // }
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={title}
      subTitle={subtitle}
      closeIcon
      button={{ name: submitButtonName, form: idForm }}
    >
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
