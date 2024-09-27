/**
 * Creates the initial state for the contact form.
 * Initializes each field with a 'isFocused: false' property.
 *
 * @param {string[]} [listOfproperties = []] - The list of properties (form fields) to initialize in the state.
 * @returns {Record<string, { isFocused: boolean }>} The initial state of the contact form, with each field initialized.
 *
 * @al-dev93
 */
export function createContactFormInitialState(listOfproperties: string[] = []): Record<string, { isFocused: boolean }> {
  return listOfproperties?.reduce(
    (acc, input) => {
      if (input) {
        acc[input] = { isFocused: false };
      }
      return acc;
    },
    {} as Record<string, { isFocused: boolean }>,
  );
}
