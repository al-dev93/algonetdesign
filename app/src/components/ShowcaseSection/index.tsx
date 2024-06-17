import { memo, useEffect, useRef } from 'react';

import { useFetchData } from '@/hooks/useFetchData';
import { useOnScreen } from '@hooks/useOnScreen';
import titleLine from '@images/decorations/title_line.svg';
import { Slideshow } from '@modules/Slideshow';

import style from './style.module.css';
import { FormButton } from '../FormButton';

import type { ShowcaseSectionProps } from './types';
import type { DetailSection, DisplayMode, ProjectData, SectionsMenu } from '@/types';
import Card from '../Card';

/**
 *
 * @description // TODO: add comment
 * @param {ShowcaseSectionProps} { content, anchor, title, visibleSections }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
function MemoizedShowcaseSection({ content, anchor, title, visibleSections }: ShowcaseSectionProps): JSX.Element {
  const { data: fetchedData } = useFetchData('http://localhost:5173/api/projects', { method: 'GET' });

  const projectData = (fetchedData as ProjectData[])?.reduce(
    (acc: { slideshow: ProjectData[]; card: ProjectData[] }, current) => {
      const property = current.display;
      if (current.display) acc[property as DisplayMode] = [...acc[property as DisplayMode], current];
      return acc;
    },
    { slideshow: [], card: [] },
  );

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
  /**
   *
   * @description // TODO: add comment
   * @param {DetailSection} { id, tag, name, content: contentElement }
   * @return {*}  {(JSX.Element | undefined)}
   * @al-dev93
   */
  const createElement = ({ id, tag, name, content: contentElement }: DetailSection): JSX.Element | undefined => {
    switch (tag) {
      case 'p':
        return (
          <p key={id} className={name && style[name]}>
            {contentElement}
          </p>
        );
      case 'h1':
        return (
          <h1 key={id} className={name && style[name]}>
            {contentElement}
          </h1>
        );
      case 'Slideshow':
        return <Slideshow key={id} projectData={projectData?.slideshow} />;
      case 'Cards':
        return (
          <div className={style.cardsWrapper}>
            {projectData?.card?.map((project) => <Card key={project.id} projectData={project} />)}
          </div>
        );
      default:
        return <div key={id}>ici vient le contenu de la section</div>;
    }
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
