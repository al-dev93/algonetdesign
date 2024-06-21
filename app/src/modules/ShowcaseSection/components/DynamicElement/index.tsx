import { createElement } from 'react';

import { COMPONENT_MAP } from '../../utils/constants';

import type { ComponentType, DynamicElementProps } from './types';

/**
 *
 * @description // TODO: add comment
 * @export
 * @param {DynamicElementProps} { tag, children, ...props }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function DynamicElement({ tag, children, ...props }: DynamicElementProps): JSX.Element {
  const Component = tag in COMPONENT_MAP ? COMPONENT_MAP[tag as ComponentType] : undefined;
  return Component ? <Component {...props}>{children}</Component> : createElement(tag, props, children);
}
