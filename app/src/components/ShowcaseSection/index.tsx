import { useEffect, useRef } from 'react';

import { useOnScreen } from '@/hooks/useOnScreen';

import { FormButton } from '../FormButton';

import titleLine from '@images/decorations/title_line.svg';

import { CatchPhrase, ShowcaseSectionProps } from './types';
import { SectionsMenu } from '@/types';

import style from './style.module.css';

const handleClick = (): void => undefined;
/**
 *
 * @description // TODO: complete
 * @param {string} title
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
const ShowcaseSectionTitle = (title: string): JSX.Element => (
  <div className={style.titleSection}>
    <h2>{title}</h2>
    <img src={titleLine} alt='line' />
  </div>
);
/**
 *
 * @description // TODO complete
 * @param {string} title
 * @param {CatchPhrase} phrase
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
const ShowcaseHeroSection = (title: string, phrase: CatchPhrase): JSX.Element => (
  <>
    <p className={style[phrase.class]}>{phrase.content}</p>
    <h1>{title}</h1>
  </>
);
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
    if (!anchor) return;
    (visibleSections.current as SectionsMenu)[anchor as keyof SectionsMenu] = isRefDisplayed;
  }, [isRefDisplayed]);

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
