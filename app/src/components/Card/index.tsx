import IonIcon from '@reacticons/ionicons';

import style from './style.module.css';
import { SkillsList } from '../SkillsList';
import { SocialMediaNavBar } from '../SocialMediaNavBar';

import type { CardProps } from './types';

/**
 *
 * @description // TODO: add comment
 * @param {CardProps} { projectData }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function Card({ data: cardData }: CardProps): JSX.Element {
  return (
    <article className={style.card}>
      <header className={style.cardHeader}>
        <IonIcon className={style.folderIcon} name='folder-open-outline' />
        <SocialMediaNavBar changeLinkColor={style.cardAdditionalNav} type='card' buttons={cardData.deliverables} />
      </header>
      <div className={style.cardMain}>
        <h3>{cardData.title}</h3>
        <p className={style.cardDescription}>{cardData.description}</p>
      </div>
      <footer className={style.cardFooter}>
        <SkillsList tagColor={style.cardSkillsList} type='wrapp' list={cardData.tags} />
      </footer>
    </article>
  );
}
