import IonIcon from '@reacticons/ionicons';
import React, { memo } from 'react';

import style from './style.module.css';
import { SkillsList } from '../SkillsList';
import { SocialMediaNavBar } from '../SocialMediaNavBar';

import type { CardProps } from './types';

/**
 * @description Card component that displays project data including title, description, skills, and social media links.
 *
 * @param {CardProps} props - The properties for the Card component.
 * @returns {React.JSX.Element} The rendered card component.
 *
 * @al-dev93
 */
function MemoizedCard({ data: cardData }: CardProps): React.JSX.Element | null {
  // TODO: sortir l'erreur
  // Ensure that the card is only displayed if the display mode is 'card'
  if (cardData.display !== 'card') {
    console.error(`Erreur: ${cardData.display} is not a Card`);
    return null;
  }

  return (
    <article className={style.card} aria-labelledby={`card-title-${cardData.id}`}>
      <header className={style.card__header}>
        <IonIcon className={style.card__folderIcon} name='folder-open-sharp' />
        <SocialMediaNavBar changeLinkColor={style.card__additionalNav} type='card' buttons={cardData.deliverables} />
      </header>
      <div className={style.card__main}>
        <h3 id={`card-title-${cardData.id}`}>{cardData.title}</h3>
        <p className={style.card__description}>{cardData.description}</p>
      </div>
      <footer className={style.card__footer}>
        <SkillsList tagColor={style.card__skillsList} lineBreak list={cardData.tags} />
      </footer>
    </article>
  );
}

export const Card = memo(MemoizedCard);
