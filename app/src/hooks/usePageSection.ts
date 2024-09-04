import { useOutletContext } from 'react-router-dom';

import type { OutletContextPage } from '@/types';

/**
 *
 * @description custom hook that retrieves the current page section context from react-router's outlet.
 * This hook provides access to the 'OutletContextPage', which includes:
 *   - The visibility status of various page sections.
 *   - A function to open or close the contact form dialog.
 *
 * @returns {OutletContextPage} The context containing the visible sections and contact form state.
 *
 * @al-dev93
 */
export function usePageSection(): OutletContextPage {
  return useOutletContext<OutletContextPage>();
}
