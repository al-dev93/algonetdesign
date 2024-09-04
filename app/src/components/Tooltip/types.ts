import { ReactNode } from 'react';

import { TooltipContent } from '@/types';

/**
 * @description Props for the Tooltip component
 *
 * @type {object} TooltipProps
 * @property {ReactNode} children - The children elements to wrap with the tooltip.
 * @property {(string | TooltipContent | TooltipContent[])} content - The content to display in the tooltip
 * Can be a string, a TooltipContent object, or an array of TooltipContent objects.
 * @property {number} [delay=400] - The defay in milliseconds before showing the tooltip.
 * @property {('bottom' | 'left' | 'right' | 'top')} [direction='top'] - The direction of the tooltip.
 * @property {boolean} forceActive - Force the parent to control the tooltip state.
 *
 * @al-dev93
 */
export type TooltipProps = {
  children: ReactNode;
  content: string | TooltipContent | TooltipContent[];
  delay?: number;
  direction?: 'bottom' | 'left' | 'right' | 'top';
  forceActive?: boolean;
};
