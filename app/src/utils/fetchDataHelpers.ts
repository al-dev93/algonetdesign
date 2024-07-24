/**
 *
 * @description // TODO: add comment
 * @export
 * @param {(string | null)} url
 * @param {object} data
 * @param {((url: string | null, { ...options }: { [x: string]: unknown }) => (() => void) | undefined)} setFetchOptionsData
 * @returns {*} {void}
 * @al-dev93
 */
export function addFetchData(
  url: string | null,
  data: object,
  setFetchOptionsData: (url: string | null, { ...options }: { [x: string]: unknown }) => (() => void) | undefined,
) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  setFetchOptionsData(url, options);
}
