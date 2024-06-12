import style from './style.module.css';
import { STOP } from '../../utils/constants';

import type { FadeProps } from '../../types';

/**
 *
 * @description // TODO: add component
 * @export
 * @param {FadeProps} { children, state, slide, duration = 600 }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
export function Fade({ children, state, slide, duration = 600 }: FadeProps): JSX.Element {
  const animationDuration = slide.loopSlide ? `${duration * 1.5}ms` : `${duration}ms`;
  const className = `${state === STOP ? '' : style.fade}`;
  return (
    <div className={className} style={{ animationDuration }}>
      {children}
    </div>
  );
}
