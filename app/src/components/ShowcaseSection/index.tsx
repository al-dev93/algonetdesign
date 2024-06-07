import { memo, useEffect, useRef } from 'react';

import { useOnScreen } from '@hooks/useOnScreen';
import titleLine from '@images/decorations/title_line.svg';

import style from './style.module.css';
import { FormButton } from '../FormButton';

import type { ShowcaseSectionProps } from './types';
import type { DetailSection, SectionsMenu } from '@/types';

const handleClick = (): void => undefined;
/**
 *
 * @description // TODO: complete
 * @param {string} title
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
function showcaseSectionTitle(title: string): JSX.Element {
  return (
    <div className={style.titleSection}>
      <h2>{title}</h2>
      <img src={titleLine} alt='line' />
    </div>
  );
}

function createElement({ tag, name, content }: DetailSection): JSX.Element | undefined {
  switch (tag) {
    case 'p':
      return <p className={name && style[name]}>{content}</p>;
    case 'h1':
      return <h1 className={name && style[name]}>{content}</h1>;
    default:
      return <div>ici vient le contenu de la section</div>;
  }
}
/**
 *
 * @description // TODO: complete
 * @export
 * @param {ShowcaseSectionProps} {
 *   anchor,
 *   catchPhrase,
 *   title,
 *   type,
 *   visibleSections,
 * }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
function MemoizedShowcaseSection({ content, anchor, title, visibleSections }: ShowcaseSectionProps): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  // TODO: add comment
  const isRefDisplayed = useOnScreen(sectionRef, '-100px');
  console.log(content);

  useEffect(() => {
    const section = visibleSections;
    if (!anchor) return;
    (section.current as SectionsMenu)[anchor as keyof SectionsMenu] = isRefDisplayed;
  }, [anchor, isRefDisplayed, visibleSections]);
  console.log(`section ${anchor}`);

  return (
    <section className={title ? style.section : style.hero} ref={sectionRef} id={anchor}>
      <div className={style.bodySection}>
        {title ? showcaseSectionTitle(title) : null}
        {content.map((element) => createElement(element))}
      </div>
      <FormButton name='Contact' onClick={handleClick} />
    </section>
  );
}

export const ShowcaseSection = memo(MemoizedShowcaseSection);
