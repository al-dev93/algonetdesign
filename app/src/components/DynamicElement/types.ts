import React, { ComponentProps, HTMLAttributes, ReactNode } from 'react';

import { COMPONENT_MAP } from '@utils/constants';

/**
 * Repesents the type of component that can be rendered.
 *
 * @type {keyof typeof COMPONENT_MAP} ComponentType
 *
 * @al-dev93
 */
export type ComponentType = keyof typeof COMPONENT_MAP;

/**
 * Properties of custom components (like Card, SkillsCloud, Slideshow).
 *
 * @type {object} CustomComponentProps
 * @property {ComponentType} tag - The custom component type to render, based on the `COMPONENT_MAP`.
 * @property {React.ReactNode} [children] - Optional child nodes to be rendered inside the component.
 * @property {Object} [props] - Any aditional props required by the chosen component type.
 *
 * @al-dev93
 */
type CustomComponentProps = {
  tag: ComponentType;
  children?: ReactNode;
} & ComponentProps<(typeof COMPONENT_MAP)[ComponentType]>;

/**
 * Props for an HTML element.
 *
 * @type {object} HtmlElementProps
 * @property {keyof React.JSX.IntrinsicElements} tag - The HTML tag to render (e.g., 'div', 'span', etc.).
 * @property {React.ReactNode} [children] - Optional child nodes to be rendered inside the HTML element.
 * @property {HTMLAttributes<HTMLElement>} [props] - Stndard HTML attributes applicable to the HTML element.
 *
 * @al-dev93
 */
type HtmlElementProps = {
  tag: keyof React.JSX.IntrinsicElements;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

/**
 * Props for the DynamicElement component, which can render either a custom component
 * or a native HTML element.
 *
 * @type {CustomComponentProps | HtmlElementProps} DynamicElementProps
 * @property {ComponentType | keyof React.JSX.IntrinsicElements} tag - The tag representing either a custom component
 * or an HTML element.
 * @property {React.ReactNode} [children] - Optional child nodes to be rendered inside the element or component.
 * @property {Object} [props] - Any additinal props or attributes specific to the chosen tag.
 *
 * @al-dev93
 */
export type DynamicElementProps = CustomComponentProps | HtmlElementProps;
