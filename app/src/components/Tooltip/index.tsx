import React, { Fragment, useCallback, useId, useRef, useState } from 'react';

import { TooltipContent } from '@/types';

import style from './style.module.css';
import { TooltipProps } from './types';

/**
 * Tooltip component that displays a tooltip on hover or focus.
 *
 * @component
 * @param {TooltipProps} props - the properties for the Tooltip component.
 * @property {ReactNode} children - The children elements to wrap with the tooltip.
 * @property {(string | TooltipContent | TooltipContent[])} content - The content to display in the tooltip
 * Can be a string, a TooltipContent object, or an array of TooltipContent objects.
 * @property {number} [delay=400] - The defay in milliseconds before showing the tooltip.
 * @property {('bottom' | 'left' | 'right' | 'top')} [direction='top'] - The direction of the tooltip.
 * @property {boolean} forceActive - Force the parent to control the tooltip state.
 * @returns {React.JSX.Element} The rendered tag component.
 *
 * @al-dev93
 */
export function Tooltip({
  children,
  content,
  delay = 400,
  direction = 'top',
  forceActive,
}: TooltipProps): React.JSX.Element {
  const [active, setActive] = useState(false);
  const tooltipId = useId();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActive = forceActive !== undefined ? forceActive : active;

  /**
   * @description Show the tooltip after a delay.
   */
  const showTip = useCallback((): void => {
    timeoutRef.current = setTimeout(() => {
      setActive(true);
    }, delay);
  }, [delay]);

  /**
   * @description Hide the tooltip
   */
  const hideTip = useCallback((): void => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    setActive(false);
  }, []);

  /**
   * @description Create line breaks based on the given line count.
   *
   * @param {number} lineCount - The number of the line breaks to create.
   * @returns {React.JSX.Element[]} An array of line breaks elements.
   */
  function createLineBreaks(lineCount: number): React.JSX.Element[] {
    return Array.from({ length: lineCount }, (_, index) => <br key={`lh-${index}`} />);
  }

  /**
   * @description Display the tooltip content.
   *
   * @param {TooltipContent | TooltipContent[]} text - The content to display in the tooltip.
   * @returns {React.JSX.Element | null} The rendered tooltip content.
   */
  function renderTooltipContent(text: TooltipContent | TooltipContent[]): React.JSX.Element | null {
    if (Array.isArray(text))
      return text.length > 0 ? (
        <p>
          {text.map((line) => (
            <Fragment key={line.id}>
              {line.line}
              {line.lineHeight ? createLineBreaks(line.lineHeight) : null}
            </Fragment>
          ))}
        </p>
      ) : null;
    return <p>{text.line}</p>;
  }

  return (
    <div
      className={style.tooltip}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      onFocus={showTip}
      onBlur={hideTip}
      aria-describedby={tooltipId}
      role='tooltip'
      aria-hidden={!isActive} // Hide tooltip content from screen readers if not active
    >
      {children}
      {isActive && (
        <div id={tooltipId} className={`${style.tooltip__tip} ${style[`tooltip__tip--${direction}`]}`}>
          {typeof content === 'string' ? <p>{content}</p> : renderTooltipContent(content)}
        </div>
      )}
    </div>
  );
}
