import type { Skill } from '@/types';

export type SkillsCloudProps = {
  data?: Skill[];
  url?: string;
  width: number | 800;
  height: number | 400;
  rotate?: boolean;
};

export type SkillsSpiralType = 'archimedean' | 'rectangular';
