import { useFetchData } from '@hooks/useFetchData';
import { usePageSection } from '@hooks/usePageSection';

import style from './style.module.css';

import type { IndexPageSection } from '@/types';
import { ShowcaseSection } from '@components/ShowcaseSection';

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

  return (
    <div className={style.wrapperIndex}>
      {(data as IndexPageSection[])?.map(({ id, anchor, title, type, catchPhrase }) => (
        <ShowcaseSection
          key={id}
          anchor={anchor}
          title={title}
          type={type}
          catchPhrase={catchPhrase}
          visibleSections={outletContext}
        />
      ))}
    </div>
  );
}
