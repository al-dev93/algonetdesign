import { useEffect, useRef } from 'react';

import { useOnScreen } from '@hooks/useOnScreen';
import titleLine from '@images/decorations/title_line.svg';

import style from './style.module.css';
import { FormButton } from '../FormButton';

import type { CatchPhrase, ShowcaseSectionProps } from './types';
import type { SectionsMenu } from '@/types';

const handleClick = (): void => undefined;
/**
 *
 * @description // TODO: complete
 * @param {string} title
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
function ShowcaseSectionTitle(title: string): JSX.Element {
  return (
    <div className={style.titleSection}>
      <h2>{title}</h2>
      <img src={titleLine} alt='line' />
    </div>
  );
}
/**
 *
 * @description // TODO complete
 * @param {string} title
 * @param {CatchPhrase} phrase
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
function ShowcaseHeroSection(title: string, phrase: CatchPhrase): JSX.Element {
  const { content, styleClass } = phrase;
  return (
    <>
      <p className={style[styleClass]}>{content}</p>
      <h1>{title}</h1>
    </>
  );
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
export function ShowcaseSection({
  anchor,
  catchPhrase,
  title,
  type,
  visibleSections,
}: ShowcaseSectionProps): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  // TODO: add comment
  const isRefDisplayed = useOnScreen(sectionRef, '-100px');

  useEffect(() => {
    const section = visibleSections;
    if (!anchor) return;
    (section.current as SectionsMenu)[anchor as keyof SectionsMenu] = isRefDisplayed;
  }, [anchor, isRefDisplayed, visibleSections]);

  return (
    <section className={style[type]} ref={sectionRef} id={anchor}>
      <div className={style.bodySection}>
        {type === 'hero' ? ShowcaseHeroSection(title, catchPhrase as CatchPhrase) : ShowcaseSectionTitle(title)}
        <div>ici vient le contenu de la section</div>
      </div>
      <FormButton name='Contact' onClick={handleClick} />
    </section>
  );
}
