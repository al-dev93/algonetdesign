import classNames from 'classnames';
import React, { memo, useEffect, useRef } from 'react';

import { ModalFormButton } from '@components/ModalFormButton';
import { useOnScreen } from '@hooks/useOnScreen';
import titleLine from '@images/decorations/title_line.svg';

import style from './style.module.css';
import { DynamicElement } from '../DynamicElement';
import { DynamicElementContainer } from '../DynamicElementContainer';

import type { ShowcaseSectionProps } from './types';
import type { ComponentType } from '../DynamicElement/types';
import type { MenuSectionsVisibility } from '@/types';

/**
 * @description Returns the CSS class adapted to the node that is passed as a parameter.
 * This allows you to adjust the style dynamically.
 *
 * @param {string} [node] - The element to which the style is applied.
 * @return {string} Returns the CSS class.
 *
 * @al-dev93
 */
function getElementClassName(node?: string): string {
  return node ? node && style[`section__${node}`] : '';
}

/**
 * @description ShowcaseSection component that displays a section with dynamic content and a modal form button.
 *
 * @param {ShowcaseSectionProps} props - The properties for the ShowcaseSection component.
 * @returns {React.JSX.Element} The rendered Tag component.
 *
 * @al-dev93
 */
function MemoizedShowcaseSection({
  content,
  anchor,
  title,
  MenuSectionsVisibility,
  openModalFormDialog,
}: ShowcaseSectionProps): React.JSX.Element {
  /**
   * @description Renders the title section with a decorative line.
   *
   * @param {string} titleSection - The title text.
   * @returns {JSX.Element} The rendered section title.
   *
   * @al-dev93
   */
  const showcaseSectionTitle = (titleSection: string): JSX.Element => {
    return (
      <div className={style.section__titleSection}>
        <h2>{titleSection}</h2>
        <img src={titleLine} alt='Decorative line' />
      </div>
    );
  };

  const sectionRef = useRef<HTMLElement>(null);
  const isRefDisplayed = useOnScreen(sectionRef, '-100px');

  useEffect(() => {
    const section = MenuSectionsVisibility;
    if (!anchor) return;
    (section.current as MenuSectionsVisibility)[anchor as keyof MenuSectionsVisibility] = isRefDisplayed;
  }, [anchor, isRefDisplayed, MenuSectionsVisibility]);

  // console.log(`section ${anchor}`);
  // console.log(content);

  return (
    <section className={classNames(style.section, { [style['section--hero']]: !title })} ref={sectionRef} id={anchor}>
      <div className={style.section__bodySection}>
        {title ? showcaseSectionTitle(title) : null}
        {content.map((renderNode) =>
          !renderNode.wrapped ? (
            <DynamicElement // TODO: add comment
              key={renderNode.id}
              tag={renderNode.tag as keyof React.JSX.IntrinsicElements | ComponentType}
              url={renderNode.urlContent}
              className={getElementClassName(renderNode.name)}
            >
              {renderNode.content}
              {renderNode.boldContent?.length
                ? renderNode.boldContent.map((item) => (
                    <DynamicElement
                      key={item.id}
                      tag={item.tag as keyof React.JSX.IntrinsicElements | ComponentType}
                      className={getElementClassName(item.name)}
                    >
                      {item.content}
                    </DynamicElement>
                  ))
                : null}
            </DynamicElement>
          ) : (
            <DynamicElementContainer
              key={renderNode.id}
              tag={renderNode.tag as keyof React.JSX.IntrinsicElements | ComponentType}
              className={getElementClassName(renderNode.name)}
              filterValue='card'
              url='http://localhost:5173/api/projects' // TODO: variable d'environnement
            />
          ),
        )}
      </div>
      <ModalFormButton name='Contact' onClick={openModalFormDialog} />
    </section>
  );
}

export const ShowcaseSection = memo(MemoizedShowcaseSection);
