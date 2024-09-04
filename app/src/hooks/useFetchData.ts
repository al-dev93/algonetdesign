import { useCallback, useEffect, useRef, useState } from 'react';

import type { FetchData, FetchOptions, FetchResultData } from '@/types';

/**
 * @description Custom hook to fetch data from a given URL or multiple URLs with specified options.
 *
 * @param {(string | undefined | null)} [initialUrl=null] - The URL to fetch data from.
 * @param {FetchOptions} [initialOptions={}] - The options to use for the fetch request.
 * @param {boolean} [shouldRefetch=false] - A flag indicating if the data should be refetched.
 * if `true`, the hook will trigger a new fetch when dependancies change.
 * if `false`, the hook will not refetch the data unless explicitly called.
 * @returns {FetchResultData } The result of the fetch operation, including data, loading state,
 * and error state.
 *
 * @al-dev93
 */
export function useFetchData(
  initialUrl: string | undefined | null = null,
  initialOptions: FetchOptions = {},
  shouldRefetch: boolean = false,
): FetchResultData {
  const [data, setData] = useState<FetchData>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef<boolean>(false);
  const controllerRef = useRef<AbortController | null>(null);

  const executeFetch = useCallback(
    async (url: string | undefined | null = initialUrl || '', options: FetchOptions = initialOptions) => {
      if (!url) {
        setError('No URL provided');
        return;
      }

      if (hasFetched.current && !shouldRefetch) return;

      // If there's an ongoing request, abort it
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();
      const { signal } = controllerRef.current;

      setIsLoaded(false);
      setError(null);

      try {
        const response = await fetch(url, { ...options, signal });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const fetchData = await response.json();
        setData(url ? fetchData[url.substring(26)] : fetchData);
        setIsLoaded(true);
        hasFetched.current = true;
      } catch (fetchError: unknown) {
        if (fetchError instanceof Error) {
          if (fetchError.name !== 'AbortError') {
            setError(fetchError.message);
            setIsLoaded(true);
          }
        } else {
          setError('An unkown error occured');
          setIsLoaded(true);
        }
      }
    },
    [initialOptions, initialUrl, shouldRefetch],
  );

  // Fetch data when the hook is mounted or when dependancies change
  useEffect(() => {
    executeFetch();

    // Cleanup function to abort fetch on unmount or when dependancies change
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [executeFetch]);
  return { data, isLoaded, error, refetch: executeFetch };
}
