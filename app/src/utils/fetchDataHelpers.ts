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
export function refetchWithArgs(
  url: string | null,
  refetch: (url: string | null, { ...options }: { [x: string]: unknown }) => Promise<void>,
  method: 'GET' | 'POST',
  data?: object,
  // setFetchOptionsData: (url: string | null, { ...options }: { [x: string]: unknown }) => (() => void) | undefined,
): void {
  let options = {};
  switch (method) {
    case 'GET':
      options = { method };
      break;
    case 'POST':
      options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      break;

    default:
      break;
  }
  if (url) refetch(url, options);
  // setFetchOptionsData(url, options);
}
