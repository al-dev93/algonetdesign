import { memo } from 'react';

import { Card } from '@components/Card';
import { SkillsCloud } from '@components/SkillsCloud';
import { Slideshow } from '@modules/Slideshow';

import type { CardProps } from '@components/Card/types';
import type { SkillsCloudProps } from '@components/SkillsCloud/types';

/**
 * @description // TODO: add comment
 * @export
 * @al-dev93
 */
export const COMPONENT_MAP = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Slideshow: memo((props: any) => <Slideshow {...props} />),
  Card: memo((props: CardProps) => <Card {...props} />),
  SkillsCloud: memo((props: SkillsCloudProps) => <SkillsCloud {...props} />),
};
