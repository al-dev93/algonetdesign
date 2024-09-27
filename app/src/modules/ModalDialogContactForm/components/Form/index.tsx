import React, { FormEvent, memo } from 'react';

import { useFetchData } from '@hooks/useFetchData';
import { refetchWithArgs } from '@utils/fetchDataHelpers';

import { FormContent } from './Components/FormContent';
import { getSubmitData } from '../../utils/formHelpers';

import type { FormProps } from '../../types';

/**
 * The Form component integrates the FormContent component and handles the connection with the API.
 * Form component memoized with 'React.memo' to optimize performance. The component will only
 * re-render if the props change.
 *
 * @component
 * @param {FormProps} props - The properties for the Form component.
 * @property {string} idForm - The form identifier in HTML.
 * @property {string} urlApi - URL allowing dialogue with the API.
 * @property {string} [urlFormContent] - URL to fetch the elements embedded in the FormContent component
 * (optional, used if dataFormContent is not used).
 * @property {ContactFormInput[]} [dataFormContent] - Data on elements embedded in the FormContent component
 * (optional,used if urlFormContent is not used).
 * @property {ModalDialogContactFormState} state - the current state of the modal dialog contact form.
 * @property {Dispatch<ModalDialogContactFormAction>} dispatch - the dispatch function to handle actions
 * related to the modal dialog contact form.
 * @property {SetStateBoolean} setOpenAlert - A function to toggle the open/close state of the alert modal.
 * @property {SetStateBoolean} onRenderComplete - Function to toggle the flag that tracks whether the
 * FormContent component is rendered.
 * @returns {React.JSX.Element}
 *
 * @al-dev93
 */
function MemoizedForm({
  idForm,
  urlApi,
  urlFormContent,
  dataFormContent,
  state,
  dispatch,
  setOpenAlert,
  onRenderComplete,
}: FormProps): React.JSX.Element {
  // Prepare for submitting form data via POST
  const { refetch } = useFetchData(undefined, { method: 'POST' }, true);

  /**
   * Handles the form submission process. Validates form inputs and triggers an API request
   * if the form values are valid.
   *
   * @param {FormEvent<HTMLFormElement>} event - The form submit event.
   *
   * @al-dev93
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    setOpenAlert(true);
    const validValues = getSubmitData(state);
    if (validValues) refetchWithArgs(urlApi, refetch, 'POST', validValues);
  };

  return (
    <form action='' id={idForm} method='dialog' onSubmit={handleSubmit} noValidate>
      <FormContent
        urlFormContent={urlFormContent}
        dataFormContent={dataFormContent}
        state={state}
        dispatch={dispatch}
        onRenderComplete={onRenderComplete}
      />
    </form>
  );
}

export const Form = memo(MemoizedForm);
