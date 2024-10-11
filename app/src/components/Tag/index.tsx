import classNames from 'classnames';
import React from 'react';

import { ALERTED_STYLE, THINNED_STYLE } from '@utils/constants';

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
        [style[`tag--${THINNED_STYLE}`]]: type === ALERTED_STYLE,
      })}
      style={position}
      aria-live={type === ALERTED_STYLE ? 'assertive' : 'polite'}
    >
      {tag}
    </span>
  );
}
