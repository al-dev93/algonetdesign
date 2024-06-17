import { ShowcaseSection } from '@components/ShowcaseSection';
import { useFetchData } from '@hooks/useFetchData';
import { usePageSection } from '@hooks/usePageSection';

import style from './style.module.css';

import type { IndexPageSection } from '@/types';

/**
 *
 * @description home page content inserted into the layout
 * @export
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function Index(): JSX.Element {
  // COMMENT: uses the custom hook usePageSection to retrieve the
  //  layout context
  const { outletContext } = usePageSection();
  const { data } = useFetchData('http://localhost:5173/api/showcaseSections', { method: 'GET' });

  console.log(data);

  return (
    <div className={style.wrapperIndex}>
      {(data as IndexPageSection[])?.map(({ id, content, anchor, title }) => (
        <ShowcaseSection key={id} content={content} anchor={anchor} title={title} visibleSections={outletContext} />
      ))}
    </div>
  );
}
