import { ReactNode } from 'react';

import { TooltipContent } from '@/types';

export type TooltipProps = {
  children: ReactNode;
  content: string | TooltipContent | TooltipContent[];
  delay?: number;
  direction?: 'bottom' | 'left' | 'right' | 'top';
};
