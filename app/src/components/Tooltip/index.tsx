import { Fragment, useState } from 'react';

import { TooltipContent } from '@/types';

import style from './style.module.css';
import { TooltipProps } from './types';

/**
 *
 * @description // TODO: add comment
 * @export
 * @param {TooltipProps} { content, lineHeight = 0, delay = 400, direction = 'top' }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function Tooltip({ children, content, delay = 400, direction = 'top' }: TooltipProps): JSX.Element {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);
  /**
   * @description // TODO: add comment
   * @callback
   * @return {*} {void}
   * @al-dev93
   */
  const showTip = (): void => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };
  /**
   * @description // TODO: add comment
   * @callback
   * @return {*} {void}
   * @al-dev93
   */
  const hideTip = (): void => {
    clearInterval(timeout);
    setActive(false);
  };
  /**
   * @description // TODO: add comment
   * @param {number} lineCount
   * @return {*} {JSX.Element[]}
   * @al-dev93
   */
  function setLineHeight(lineCount: number): JSX.Element[] {
    const lineHeight = [];
    // eslint-disable-next-line no-plusplus
    for (let count = lineCount; count >= 0; count--) {
      lineHeight.push(<br key={`lh-${count}`} />);
    }
    return lineHeight;
  }
  /**
   * @description // TODO: add comment
   * @param {TooltipContent | TooltipContent[]} text
   * @return {*} {JSX.Element | null}
   * @al-dev93
   */
  function displayTooltipContent(text: TooltipContent | TooltipContent[]): JSX.Element | null {
    if (Array.isArray(text))
      return text.length > 0 ? (
        <p>
          {text.map((line) => (
            <Fragment key={line.id}>
              {line.line}
              {line.lineHeight ? setLineHeight(line.lineHeight) : null}
            </Fragment>
          ))}
        </p>
      ) : null;
    return <p>{text.line}</p>;
  }

  return (
    <div className={style.tooltipWrapper} onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active ? (
        <div className={`${style.tooltipTip} ${style[direction]}`}>
          {typeof content === 'string' ? <p>{content}</p> : displayTooltipContent(content)}
        </div>
      ) : null}
    </div>
  );
}
