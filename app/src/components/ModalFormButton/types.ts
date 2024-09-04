import { MouseEventButton } from '@/types';

/**
 * @description Props for the ModalFormButton component.
 *
 * @type {object} FormButtonProps
 * @property {string} [className] - Additional class names to apply to the button.
 * @property {string} [form] - The ID of the form the button is associated with.
 * @property {MouseEventButton} [onClick] - Click event handler for the button.
 * @property {string} name - The text content of the button.
 * @property {boolean} [disabled] - Indicates whether the button is disabled.
 *
 * @al-dev93
 */
export type FormButtonProps = {
  className?: string;
  form?: string;
  onClick?: MouseEventButton;
  name: string;
  disabled?: boolean;
};
