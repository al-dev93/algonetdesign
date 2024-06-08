import { TagType } from '@/types';

export type SkillsListProps = {
  tagColor?: string;
  list: string[] | undefined;
  type?: Exclude<TagType, 'table' | 'error'>;
};
