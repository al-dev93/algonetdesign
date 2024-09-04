import React from 'react';

import { ShowcaseSection } from '@components/ShowcaseSection';
import { useFetchData } from '@hooks/useFetchData';
import { usePageSection } from '@hooks/usePageSection';

import style from './style.module.css';

import type { IndexPageSection } from '@/types';

/**
 *
 * @description home page content inserted into the layout
 * @export
 * @return {React.JSX.Element}
 * @al-dev93
 */
export function Index(): React.JSX.Element {
  // COMMENT: uses the custom hook usePageSection to retrieve the
  //  layout context
  const { viewSectionContext, setOpenContactFormDialog } = usePageSection();
  const { data } = useFetchData('http://localhost:5173/api/showcaseSections', { method: 'GET' });

  // useEffect(() => {
  //   setFetchOptionsData('http://localhost:5173/api/showcaseSections', { method: 'GET' });
  // }, [setFetchOptionsData]);

  const handleClick = (): void => setOpenContactFormDialog((state) => !state);

  return (
    <div className={style.wrapperIndex}>
      {(data as IndexPageSection[])?.map(({ id, content, anchor, title }) => (
        <ShowcaseSection
          key={id}
          content={content}
          anchor={anchor}
          title={title}
          MenuSectionsVisibility={viewSectionContext}
          openModalFormDialog={handleClick}
        />
      ))}
    </div>
  );
}
