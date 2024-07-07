import { ForwardRefRenderFunction, LegacyRef, createElement, forwardRef } from 'react';

import { COMPONENT_MAP } from '@utils/constants';

import type { ComponentType, DynamicElementProps } from './types';

/**
 *
 * @description // TODO: add comment
 * @export
 * @param {DynamicElementProps} { tag, children, ...props }
 * @param {(LegacyRef<HTMLElement | HTMLInputElement | HTMLTextAreaElement>)} [ref]
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function DynamicElementRef(
  { tag, children, ...props }: DynamicElementProps,
  ref?: LegacyRef<HTMLElement | HTMLInputElement | HTMLTextAreaElement>,
): JSX.Element {
  const Component = tag in COMPONENT_MAP ? COMPONENT_MAP[tag as ComponentType] : undefined;
  return Component ? <Component {...props}>{children}</Component> : createElement(tag, { ...props, ref }, children);
}
/**
 *
 * @description // TODO: add comment
 * @export
 * @al-dev93
 */
export const DynamicElement = forwardRef(
  DynamicElementRef as ForwardRefRenderFunction<
    HTMLElement | HTMLInputElement | HTMLTextAreaElement,
    DynamicElementProps
  >,
);
