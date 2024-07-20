import { CSSProperties } from 'react';

import { TagType } from '@/types';

export interface TagProps {
  className?: string;
  tag?: string;
  type: TagType;
  position?: CSSProperties;
}
