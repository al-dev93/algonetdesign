import style from './style.module.css';
import Tag from '../Tag';

import type { SkillsListProps } from './types';

/**
 * @description
 * @param param0
 * @returns
 */
export function SkillsList({ tagColor, list, type = 'row' }: SkillsListProps): JSX.Element {
  const listStyle: string = type === 'wrapp' ? `${style['skills-row']} ${style['wrapp-row']}` : style[`skills-${type}`];

  return (
    <ul className={listStyle}>
      {list?.map((value, index) => (
        <li key={`${index + 1}`}>
          <Tag className={tagColor} tag={value} type={type} />
        </li>
      ))}
    </ul>
  );
}
