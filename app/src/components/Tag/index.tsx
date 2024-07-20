import style from './style.module.css';

import type { TagProps } from './types';

/**
 * @description
 * @param param0
 * @returns
 */
export function Tag({ className, tag, type, position }: TagProps): JSX.Element {
  return (
    <span
      className={`${className} ${style.tag} ${type === 'row' && style.filled}
      ${type === 'error' && `${style.thinned} ${style.error}`}`}
      style={position}
    >
      {tag}
    </span>
  );
}
