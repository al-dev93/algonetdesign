import { useFetchData } from '@/hooks/useFetchData';
import { usePageSection } from '@hooks/usePageSection.ts';

import { ShowcaseSection } from '@components/ShowcaseSection';

import style from './style.module.css';
/**
 *
 * @description home page content inserted into the layout
 * @export
 * @return {*}  {JSX.Element}
 */
export function Index(): JSX.Element {
  // COMMENT: uses the custom hook usePageSection to retrieve the
  //  layout context
  const { outletContext } = usePageSection();
  const { sectionList } = useFetchData(true);

  return (
    <div className={style.wrapperIndex}>
      {sectionList &&
        sectionList.map(({ id, anchor, title, type, catchPhrase }) => (
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
