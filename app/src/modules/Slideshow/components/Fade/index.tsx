import React from 'react';

import style from './style.module.css';
import { STOP } from '../../utils/constants';

import type { FadeProps } from '../../types';

/**
 *
 * @description // TODO: add component
 * @export
 * @param {FadeProps} { children, state, duration = 600 }
 * @return {React.JSX.Element}
 * @al-dev93
 */
export function Fade({ children, state, duration = 600 }: FadeProps): React.JSX.Element {
  const animationDuration = state.loopSlide ? `${duration * 1.5}ms` : `${duration}ms`;
  const className = `${state.slideTransition === STOP ? '' : style.fade}`;
  return (
    <div className={className} style={{ animationDuration }}>
      {children}
    </div>
  );
}
