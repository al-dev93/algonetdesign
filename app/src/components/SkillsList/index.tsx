import classNames from 'classnames';
import React from 'react';

import style from './style.module.css';
import { Tag } from '../Tag';

import type { SkillsListProps } from './types';

/**
 * @description SkillsList component that displays a list of skills as tags.
 *
 * @param {SkillsListProps} props - The properties for the SkillsList component.
 * @returns {React.JSX.Element} The rendered skills list component.
 *
 * @al-dev93
 */
export function SkillsList({ tagColor, list, lineBreak, tagType }: SkillsListProps): React.JSX.Element {
  return (
    <ul className={classNames(style.skillsRow, { [style['skillsRow--wrapp']]: lineBreak })} aria-label='Skills list'>
      {list?.map((value) => (
        <li key={value}>
          <Tag className={tagColor} tag={value} type={tagType} />
        </li>
      ))}
    </ul>
  );
}
