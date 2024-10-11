import React, { memo, useMemo } from 'react';

import style from './style.module.css';
import { ANIMATION_DURATION, STOP } from '../../utils/constants';

import type { FadeProps } from '../../types';

/**
 * Component to handle fade transitions between slides.
 *
 * @component
 * @param {FadeProps} props - The props for the Fade component.
 * @property {React.JSX.Element} children - The children to be displayed during the transition.
 * @property {SlideshowState} state - The slideshow state to control the transition.
 * @property {number} [duration=600] - The duration of the transition in milliseconds.
 * @returns {React.JSX.Element} A JSX element representing the fade animation.
 *
 * @al-dev93
 */
function MemoizedFade({ children, state, duration = ANIMATION_DURATION }: FadeProps): React.JSX.Element {
  // Validates the presence of both `children` and `state` props. If either is missing, it logs an error on error page.
  if (!children || !state) {
    // TODO sortir l'erreur
    console.error("Missing 'children' or 'state' props in Fade component");
  }

  /**
   * Apply the fade class conditionally, only when the slideshow's transition state is different from STOP.
   *
   * @type {string}
   */
  const className = useMemo(() => (state.slideTransition !== STOP ? style.fade : ''), [state.slideTransition]);

  return (
    <div className={className} style={{ animationDuration: `${duration}ms` }}>
      {children}
    </div>
  );
}

export const Fade = memo(MemoizedFade);
