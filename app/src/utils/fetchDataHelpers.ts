/**
 * Executes a refetch operation with dynamic arguments such as URL, HTTP method, and optional data payload.
 * The function determines the request options based on the method ('GET' or 'POST') and invokes the 'refetch' function.
 *
 * @function
 * @param {(string | null)} url - The URL to wich the request should be made. If null, no refetch is triggered.
 * @param {(url: string | null, { ...options }: { [x: string]: unknown }) => Promise<void>} refetch - The function that handles
 * the refetch operation. It accepts the URL and options as arguments.
 * @param {('GET' | 'POST')} method - The HTTP method to use for the request ('GET' or 'POST').
 * @param {object} [data] - Optional data to include in the request body when using the 'POST' method.
 * @returns {void}
 *
 * @example
 * refetchWithArgs(
 *   'https://example.com/api/data',
 *   refetch,
 *   { name: 'John Doe', age: 30 }
 * );
 *
 * @al-dev93
 */
export function refetchWithArgs(
  url: string | null,
  refetch: (url: string | null, { ...options }: { [x: string]: unknown }) => Promise<void>,
  method: 'GET' | 'POST',
  data?: object,
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
}
