/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@components/Card';
import { SkillsCloud } from '@components/SkillsCloud';
import { Slideshow } from '@modules/Slideshow';

/**
 * @description // TODO: add comment
 * @export
 * @al-dev93
 */
export const COMPONENT_MAP = {
  Slideshow: (props: any) => <Slideshow {...props} />,
  Card: (props: any) => <Card {...props} />,
  SkillsCloud: (props: any) => <SkillsCloud {...props} />,
};
