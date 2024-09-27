import React, { useEffect, useRef } from 'react';

import { useFetchData } from '@hooks/useFetchData';
import { INIT_DIALOG_CONTACT_FORM_STATE } from '@modules/ModalDialogContactForm/utils/constants';

import style from './style.module.css';
import { DialogFormInput } from '../DialogFormInput';

import type { ContactFormInput, TooltipContent } from '@/types';
import type { FormContentProps } from '@modules/ModalDialogContactForm/types';

/**
 * The FormContent component gathers all the elements that make up the content of the form. These elements
 * can be downloaded from a URL or provided as input data.
 *
 * @component
 * @param {FormContentProps} props - The properties for the FormContent component.
 * @property {string} [urlFormContent] - URL to fetch the elements embedded in the FormContent component
 * (optional, used if dataFormContent is not used)
 * @property {ContactFormInput[]} [dataFormContent] - Data on elements embedded in the FormContent component
 * (optional,used if urlFormContent is not used)
 * @property {ModalDialogContactFormState} state - the current state of the modal dialog contact form.
 * @property {Dispatch<ModalDialogContactFormAction>} dispatch - the dispatch function to handle actions
 * related to the modal dialog contact form
 * @property {SetStateBoolean} onRenderComplete - Function to toggle the flag that tracks whether the
 * FormContent component is rendered.
 * @returns {(React.JSX.Element | null)}
 *
 * @al-dev93
 */
export function FormContent({
  urlFormContent,
  dataFormContent,
  state,
  dispatch,
  onRenderComplete,
}: FormContentProps): React.JSX.Element | null {
  const isInitializedStateRef = useRef<boolean>(false);

  // Determine if data needs to be fetched
  const shouldFetch = !dataFormContent;

  // Fetch data to create form content
  const { data } = useFetchData(shouldFetch ? urlFormContent : null, { method: 'GET' });

  // Extract form content data from either fetched or provided props
  const formContent = dataFormContent || (data as ContactFormInput[] | null);

  /**
   * Initializes the contact form state when input data is fetched or provided.
   * Dispatches an action to populate the form with the initial state based on the input data.
   */
  useEffect(() => {
    if (formContent && !isInitializedStateRef.current) {
      dispatch({ type: INIT_DIALOG_CONTACT_FORM_STATE, payload: formContent.map((item) => item.id) });
      isInitializedStateRef.current = true;
      onRenderComplete(true);
    }
  }, [dispatch, formContent, onRenderComplete]);

  /**
   * Renders the FormContent component if the form elements are fetched or loaded and the state initialized.
   *
   * @function
   * @returns {(React.JSX.Element | null)} The rendered FormContent component or null if not applicable.
   */
  const renderFormContent = (): React.JSX.Element | null => {
    return isInitializedStateRef.current && formContent ? (
      <div className={style.contactForm}>
        {formContent.map(({ id, input, label, tooltipContent }) => (
          <DialogFormInput
            key={id}
            label={label}
            name={id}
            input={input}
            tooltipContent={tooltipContent as TooltipContent[] | undefined}
            state={state}
            dispatch={dispatch}
          />
        ))}
      </div>
    ) : null;
  };

  return renderFormContent();
}
