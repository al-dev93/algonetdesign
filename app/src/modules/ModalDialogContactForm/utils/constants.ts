import type { ContactFormModal } from '@/types';

const EMPTY_MODAL_DIALOG_CONTACT_FORM: ContactFormModal = {
  id: '',
  url: '',
  title: '',
  subtitle: '',
  submitButtonName: '',
  alertOnSubmit: [],
};

const AUTOCOMPLETE = 101;
const HISTORY = 100;

const DELETE_ERROR_TAG_NAME = 'DELETE_ERROR_TAG_NAME';
const DELETE_INPUT_ERROR = 'DELETE_INPUT_ERROR';
const DELETE_INPUT_VALUE = 'DELETE_INPUT_VALUE';
const INIT_DIALOG_CONTACT_FORM_STATE = 'INIT_DIALOG_CONTACT_FORM_STATE';
const RESET_AUTO_COMPLETE_OVERLAY = 'RESET_AUTO_COMPLETE_OVERLAY';
const SET_AUTO_COMPLETE = 'SET_AUTO_COMPLETE';
const SET_ERROR_TAG_NAME = 'SET_ERROR_TAG_NAME';
const SET_INPUT_BORDER_BOX = 'SET_INPUT_BORDER_BOX';
const SET_INPUT_ERROR = 'SET_INPUT_ERROR';
const SET_INPUT_FOCUS = 'SET_INPUT_FOCUS';
const SET_OVERLAY_FIRST_ITEM_FOCUS = 'SET_OVERLAY_FIRST_ITEM_FOCUS';
const SET_INPUT_VALUE = 'SET_INPUT_VALUE';

export {
  AUTOCOMPLETE,
  DELETE_ERROR_TAG_NAME,
  DELETE_INPUT_ERROR,
  DELETE_INPUT_VALUE,
  EMPTY_MODAL_DIALOG_CONTACT_FORM,
  HISTORY,
  INIT_DIALOG_CONTACT_FORM_STATE,
  RESET_AUTO_COMPLETE_OVERLAY,
  SET_AUTO_COMPLETE,
  SET_ERROR_TAG_NAME,
  SET_INPUT_BORDER_BOX,
  SET_INPUT_ERROR,
  SET_INPUT_FOCUS,
  SET_INPUT_VALUE,
  SET_OVERLAY_FIRST_ITEM_FOCUS,
};

// const CLOSED_MODAL = 'closed';
const HIDDEN_MODAL = 'hidden';
// const OPENED_MODAL = 'opened';
const SOFT_MODAL = 'soft';

export { HIDDEN_MODAL, SOFT_MODAL };
