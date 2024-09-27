import type { ContactFormModal } from '@/types';

/**
 * Default empty contact form modal structure.
 * This object is used as the default state for the modal dialog contact form.
 *
 * @constant
 * @type {ContactFormModal}
 */
const EMPTY_MODAL_DIALOG_CONTACT_FORM: ContactFormModal = {
  id: '',
  urlFormContent: '',
  urlApi: '',
  title: '',
  subtitle: '',
  submitButtonName: '',
  alertOnSubmit: [],
};

/**
 * Numeric code representing an autocomplete feature.
 *
 * @constant
 * @type {number}
 */
const AUTOCOMPLETE = 101;

/**
 * Numeric code representing a history feature for input.
 *
 * @constant
 * @type {number}
 */
const HISTORY = 100;

/**
 * Action types for the modal dialog contact form reducer.
 * These actions are dispatched to modify the state of the contact form.
 *
 * @constant
 * @type {string}
 */
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

/**
 * Constants representing different types of modal states.
 *
 * @type {string}
 */
const HIDDEN_MODAL = 'hidden';
const SOFT_MODAL = 'soft';

export {
  AUTOCOMPLETE,
  DELETE_ERROR_TAG_NAME,
  DELETE_INPUT_ERROR,
  DELETE_INPUT_VALUE,
  EMPTY_MODAL_DIALOG_CONTACT_FORM,
  HIDDEN_MODAL,
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
  SOFT_MODAL,
};
