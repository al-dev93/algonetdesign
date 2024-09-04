import { Text } from '@visx/text';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import React, { memo } from 'react';

import { useFetchData } from '@hooks/useFetchData';

import style from './style.module.css';
import {
  skillsColours,
  skillsFixedValueGenerator,
  skillsFont,
  skillsPadding,
  skillsSpiralType,
} from './utils/constants';

import type { SkillsCloudProps } from './types';
import type { Skill } from '@/types';

/**
 * @description SkillsCloud component that displays a word cloud of skills.
 *
 * @param {SkillsCloudProps} props - The properties for the SkillsCloud component.
 * @returns {React.JSX.Element} The rendered skills cloud component.
 *
 * @al-dev93
 */
function MemoizedSkillsCloud({
  data: skillsData,
  url,
  width = 800,
  height = 400,
  rotate,
}: SkillsCloudProps): React.JSX.Element {
  // Determine if data should be fetched based on the presence of skills.
  const shouldFetch = !skillsData;
  // Use useFetchData hook if shouldFetch is true
  const { data: fetchedData, error } = useFetchData(shouldFetch ? url : null, { method: 'GET' });
  // Use skillsData if provided, otherwise use fetched data.
  const data = skillsData || (fetchedData as Skill[]);

  const values = data?.map((skill) => skill.value);
  const maxValue = data && Math.max(...values);

  /**
   * @description Returns a random rotation angle for the words in the word cloud.
   *
   * @returns {number} The rotation angle.
   *
   * @al-dev93
   */
  function getRotationAngle(): number {
    const rand = Math.random();
    const degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
  }

  /**
   * @description Returns the font size for a given value based on the maximum value.
   *
   * @param {number} value - The value to calculate the font size for.
   * @returns {number} The font size.
   *
   * @al-dev93
   */
  function getFontSize(value: number): number {
    return Math.round((60 * value) / maxValue);
  }

  // TODO: sortir l'erreur
  if (error) {
    console.error(`Failed to load skills data: ${error}`);
  }

  return (
    <div className={style.skillsCloudWrapper} aria-live='polite'>
      {data && (
        <Wordcloud
          width={width}
          height={height}
          words={data as Skill[]}
          font={skillsFont}
          fontSize={(datum) => getFontSize(datum.value)}
          padding={skillsPadding}
          spiral={skillsSpiralType}
          rotate={rotate ? getRotationAngle : 0}
          random={skillsFixedValueGenerator}
        >
          {(words) =>
            words.map((word, index) => (
              <Text
                key={word.text}
                fill={skillsColours[index % skillsColours.length]}
                textAnchor='middle'
                transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
                fontSize={word.size}
                fontFamily={word.font}
              >
                {word.text}
              </Text>
            ))
          }
        </Wordcloud>
      )}
    </div>
  );
}

export const SkillsCloud = memo(MemoizedSkillsCloud);
