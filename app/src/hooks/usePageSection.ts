import { useOutletContext } from 'react-router-dom';
import { OutletContextPage } from '../types/mainPage.ts';

/**
 *
 * @description // TODO: À compléter
 * @export
 * @return {*}  {OutletContextPage}
 */
export function usePageSection(): OutletContextPage {
  return useOutletContext<OutletContextPage>();
}
