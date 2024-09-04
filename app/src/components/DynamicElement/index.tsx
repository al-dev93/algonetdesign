import React, { LegacyRef, createElement, forwardRef } from 'react';

import { DialogFormElement } from '@/types';
import { COMPONENT_MAP } from '@utils/constants';
import { isHtmlTag } from '@utils/htmlElementHelpers';

import type { ComponentType, DynamicElementProps } from './types';

/**
 * @description Renders a dynamic element based on the provided tag. If the tag corresponds to a custom component,
 * it renders that component with the provided props; otherwise, it renders a standard HTML element.
 *
 * @param {DynamicElementProps} props - The properties for the element, including the tag and children.
 * @param {LegacyRef<DialogFormElement>} [ref] - The ref to forward the element.
 * @return {React.JSX.Element} The rendered element or component.
 *
 * @al-dev93
 */
function DynamicElementRef(
  { tag, children, ...props }: DynamicElementProps,
  ref?: LegacyRef<DialogFormElement>,
): React.JSX.Element | null {
  const Component =
    tag in COMPONENT_MAP ? (COMPONENT_MAP[tag as ComponentType] as React.ComponentType<typeof props>) : undefined;

  if (Component) {
    // If the component does not support children, do not pass them
    return children ? <Component {...props}>{children}</Component> : <Component {...props} />;
  }
  if (isHtmlTag(tag as keyof React.JSX.IntrinsicElements)) {
    // For native HTML elements, we always pass children if they exist.
    return createElement(tag, { ...props, ref }, children);
  }
  // TODO: sortir l'erreur
  // The tag does not designate a custom component or a native HTML element.
  console.error(`Invalid tag: ${tag}`);
  return null;
}

export const DynamicElement = forwardRef(DynamicElementRef);
