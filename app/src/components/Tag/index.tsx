import classNames from 'classnames';
import React from 'react';

import style from './style.module.css';

import type { TagProps } from './types';

/**
 * @description Tag component that displays a tag with various style.
 *
 * @param {TagProps} props - The properties for the Tag component.
 * @returns {React.JSX.Element} The rendered Tag component.
 *
 * @al-dev93
 */
export function Tag({ className, tag, type, position }: TagProps): React.JSX.Element {
  return (
    <span
      className={classNames(className, style.tag, {
        [style[`tag--${type}`]]: type,
        [style[`tag--thinned`]]: type === 'alerted',
      })}
      style={position}
      aria-live={type === 'alerted' ? 'assertive' : 'polite'}
    >
      {tag}
    </span>
  );
}
