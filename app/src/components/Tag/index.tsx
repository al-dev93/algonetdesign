import classNames from 'classnames';
import React from 'react';

import style from './style.module.css';

import type { TagProps } from './types';

/**
 * Tag component that displays a tag with various style.
 *
 * @component
 * @param {TagProps} props - The properties for the Tag component.
 * @property {string} [className] - Additional class names for the tag.
 * @property {string} [tag] - Text content of the tag.
 * @property {('alerted' | 'filled' | 'thinned')} [type] - Type of the tag wich determines its style.
 * - 'alerted': indicates an error type tag.
 * - 'filled': indicates a filled type tag.
 * - 'thinned': indicates a thinned type tag.
 * @property {React.CSSProperties} [position] - Inline styles for positioning.
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
