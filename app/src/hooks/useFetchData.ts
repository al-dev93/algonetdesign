import { useCallback, useRef, useState } from 'react';

import type { FetchData, FetchResultData } from '@/types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @return {*}  {FetchResultData}
 * @al-dev93
 */
export function useFetchData(): FetchResultData {
  const [data, setData] = useState<FetchData>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef<boolean>(false);

  const setFetchOptionsData = useCallback((url: string | undefined | null, options = {}) => {
    if (!url || hasFetched.current) {
      setError('No URL provided');
      return undefined;
    }

    const controller = new AbortController();
    const { signal } = controller;

    setIsLoaded(false);
    setError(null);

    fetch(url, { ...options, signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(
        (fetchData) => {
          setData(url ? fetchData[url.substring(26)] : fetchData);
          setIsLoaded(true);
          hasFetched.current = true;
        },
        (fetchError) => {
          if (fetchError.name !== 'AbortError') {
            setError(fetchError.message);
            setIsLoaded(true);
          }
        },
      );
    return () => controller.abort();
  }, []);
  return { data, isLoaded, error, setFetchOptionsData };
}
