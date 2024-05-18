import { useOutletContext } from 'react-router-dom';
import { OutletContextPage } from '../types/mainPage.ts';

export function usePageSection() {
  return useOutletContext<OutletContextPage>();
}
