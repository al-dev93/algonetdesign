import type { Skill } from '@/types';

/**
 * Props for the SkillsCloud component.
 *
 * @type {object} SkillsCloudProps
 * @property {Skill[]} [data] - Data needed to create the word cloud.
 * @property {string} [url] - URL to download the data needed to create the word cloud.
 * @property {number} [width=800] - Total width of the word cloud. 800px by default.
 * @property {number} [height=400] - Total height of the word cloud. 400px by default.
 * @property {boolean} [rotate] - Word cloud rotation angle (optional).

 * @al-dev93
 */
export type SkillsCloudProps = {
  width: number;
  height: number;
  rotate?: boolean;
} & (
  | {
      data?: Skill[];
      url?: never;
    }
  | {
      data?: never;
      url?: string;
    }
);

/**
 * Sets the current type of spiral used for positioning words.
 *
 * @type {('archimedean' | 'rectangular')} SkillsSpiralType
 *
 * @al-dev93
 */
export type SkillsSpiralType = 'archimedean' | 'rectangular';
