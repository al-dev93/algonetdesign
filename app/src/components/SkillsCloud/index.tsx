import { Text } from '@visx/text';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { memo, useEffect } from 'react';

import { Skill } from '@/types';
import { useFetchData } from '@hooks/useFetchData';

import style from './style.module.css';
import { SkillsCloudProps } from './types';
import {
  skillsColours,
  skillsFixedValueGenerator,
  skillsFont,
  skillsPadding,
  skillsSpiralType,
} from './utils/constants';

function MemoizedSkillsCloud({
  data: skillsData,
  url,
  width = 800,
  height = 400,
  rotate,
}: SkillsCloudProps): JSX.Element {
  // COMMENT: determine if we should fetch data based on the presence of skills
  const shouldFetch = !skillsData;
  // COMMENT: only use useFetch if shouldFetch is true
  const { data: fetchedData, setFetchOptionsData } = useFetchData();

  useEffect(() => {
    setFetchOptionsData(shouldFetch ? url : null, { method: 'GET' });
  }, [setFetchOptionsData, shouldFetch, url]);

  // TODO: otherwise use buttons ... complete
  const data = skillsData || (fetchedData as Skill[]);
  const values = (skillsData || data)?.map((skill) => skill.value);
  const maxValue = data && Math.max(...values);
  /**
   *
   * @description // TODO: add comment
   * @return {*}  {number}
   * @al-dev93
   */
  function getRotationAngle(): number {
    const rand = Math.random();
    const degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
  }
  /**
   *
   * @description // TODO: add comment
   * @param {number} value
   * @return {*}  {number}
   * @al-dev93
   */
  function getFontSize(value: number): number {
    return Math.round((60 * value) / maxValue);
  }

  return (
    <div className={style.skillsCloudWrapper}>
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
