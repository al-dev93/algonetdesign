import { ComponentProps, HTMLAttributes, ReactNode } from 'react';

import { COMPONENT_MAP } from '@utils/constants';

export type ComponentType = keyof typeof COMPONENT_MAP;

type CustomComponentProps = {
  tag: ComponentType;
  children?: ReactNode;
} & ComponentProps<(typeof COMPONENT_MAP)[ComponentType]>;

type HtmlElementProps = {
  tag: keyof JSX.IntrinsicElements;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export type DynamicElementProps = CustomComponentProps | HtmlElementProps;
