import React, { useMemo } from 'react';

import { DynamicElement } from '@components/DynamicElement';
import { useFetchData } from '@hooks/useFetchData';

import type { DynamicElementContainerProps } from './types';

/**
 *
 * @description DynamicElementContainer component that fetches data from given URL,
 * filters it based on a filter value, and renders the DynamicElements.
 *
 * @param {DynamicElementContainerProps} props - The properties for the DynamicElementContainer component.
 * @returns {React.JSX.Element} The rendered container with DynamicElements.
 *
 * @al-dev93
 */
export function DynamicElementContainer({
  tag,
  className,
  filterValue,
  url,
  ...props
}: DynamicElementContainerProps): React.JSX.Element {
  // Fetch data using useFetchData custom hook.
  const { data: fetchedData, error } = useFetchData(url || null, { method: 'GET' });

  const filteredData = useMemo(() => {
    return filterValue
      ? fetchedData?.filter((item) => item['display' as keyof typeof item] === filterValue)
      : fetchedData;
  }, [fetchedData, filterValue]);
  // TODO: sortir l'erreur
  // Render error state if an error occured during data fetching.
  if (error) {
    console.error(`Error: ${error}`);
  }

  return (
    <div className={className}>
      {filteredData?.map((item) => <DynamicElement key={item.id} tag={tag} data={item} {...props} />)}
    </div>
  );
}
