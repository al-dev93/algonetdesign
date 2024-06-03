import { useEffect, useState } from 'react';

import type { FetchData, FetchResultData } from '@/types';
/**
 *
 * @description // TODO: add comment
 * @export
 * @param {(string | undefined | null)} url
 * @param {object} options
 * @return {*}  {FetchResultData}
 * @al-dev93
 */
export function useFetchData(url: string | undefined | null, options: object): FetchResultData {
  const [data, setData] = useState<FetchData>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return undefined;

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
        },
        (fetchError) => {
          if (fetchError.name !== 'AbortError') {
            setError(fetchError.message);
            setIsLoaded(true);
          }
        },
      );
    return () => controller.abort();
  }, [url, options]);
  return { data, isLoaded, error };
}
