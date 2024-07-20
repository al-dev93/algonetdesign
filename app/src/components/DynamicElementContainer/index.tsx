import { DynamicElement } from '@components/DynamicElement';
import { useFetchData } from '@hooks/useFetchData';

import type { DynamicElementContainerProps } from './types';

/**
 *
 * @description // TODO: add comment
 * @export
 * @param {DynamicElementContainerProps} {
 *   tag,
 *   className,
 *   filterValue,
 *   url,
 *   ...props
 * }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function DynamicElementContainer({
  tag,
  className,
  filterValue,
  url,
  ...props
}: DynamicElementContainerProps): JSX.Element {
  const { data: fetchedData } = useFetchData(url || null, { method: 'GET' });
  const data = filterValue
    ? fetchedData?.filter((item) => item['display' as keyof typeof item] === filterValue)
    : fetchedData;
  return (
    <div className={className}>
      {data?.map((item) => <DynamicElement key={item.id} tag={tag} data={item} {...props} />)}
    </div>
  );
}
