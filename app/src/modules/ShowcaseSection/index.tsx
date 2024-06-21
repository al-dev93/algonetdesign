import { memo, useEffect, useRef } from 'react';

import { useOnScreen } from '@hooks/useOnScreen';
import titleLine from '@images/decorations/title_line.svg';

import { DynamicElement } from './components/DynamicElement';
import { DynamicElementContainer } from './components/DynamicElementContainer';
import style from './style.module.css';
import { COMPONENT_MAP } from './utils/constants';
import { FormButton } from '../../components/FormButton';

import type { ShowcaseSectionProps } from './types';
import type { SectionsMenu } from '@/types';

/**
 *
 * @description // TODO: add comment
 * @param {ShowcaseSectionProps} { content, anchor, title, visibleSections }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
function MemoizedShowcaseSection({ content, anchor, title, visibleSections }: ShowcaseSectionProps): JSX.Element {
  const handleClick = (): void => undefined;
  /**
   *
   * @description // TODO: complete
   * @param {string} titleSection
   * @return {*}  {JSX.Element}
   * @al-dev93
   */
  const showcaseSectionTitle = (titleSection: string): JSX.Element => {
    return (
      <div className={style.titleSection}>
        <h2>{titleSection}</h2>
        <img src={titleLine} alt='line' />
      </div>
    );
  };

  const sectionRef = useRef<HTMLElement>(null);
  // TODO: add comment
  const isRefDisplayed = useOnScreen(sectionRef, '-100px');

  useEffect(() => {
    const section = visibleSections;
    if (!anchor) return;
    (section.current as SectionsMenu)[anchor as keyof SectionsMenu] = isRefDisplayed;
  }, [anchor, isRefDisplayed, visibleSections]);

  console.log(`section ${anchor}`);
  console.log(content);

  return (
    <section className={title ? style.section : style.hero} ref={sectionRef} id={anchor}>
      <div className={style.bodySection}>
        {title ? showcaseSectionTitle(title) : null}
        {content.map((element) =>
          !element.wrapped ? (
            <DynamicElement // TODO: add comment
              key={element.id}
              tag={element.tag as keyof JSX.IntrinsicElements | keyof typeof COMPONENT_MAP}
              url={element.urlContent}
              className={element.name && style[element.name]}
            >
              {element.content}
              {element.boldContent?.length
                ? element.boldContent.map((item) => (
                    <DynamicElement
                      key={item.id}
                      tag={item.tag as keyof JSX.IntrinsicElements | keyof typeof COMPONENT_MAP}
                      className={item.name && style[item.name]}
                    >
                      {item.content}
                    </DynamicElement>
                  ))
                : null}
            </DynamicElement>
          ) : (
            <DynamicElementContainer // TODO: add comment
              key={element.id}
              tag={element.tag}
              className={`${style[element.name ?? '']}`}
              filterValue='card'
              url='http://localhost:5173/api/projects'
            />
          ),
        )}
      </div>
      <FormButton name='Contact' onClick={handleClick} />
    </section>
  );
}

export const ShowcaseSection = memo(MemoizedShowcaseSection);
