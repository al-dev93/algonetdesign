export function createContactFormInitialState(listOfproperties: string[] | []) {
  return (
    listOfproperties?.reduce((acc: object, input: string) => {
      return input ? { ...acc, [input]: { isFocused: false } } : {};
    }, {}) || {}
  );
}
