import { Outlet } from 'react-router-dom';
import { CollapsibleHeaderState, useCollapsibleHeader } from '../../hooks/useCollapsibleHeader.ts';

import style from './style.module.css';

export function Page() {
  const collapsibleHeader = useCollapsibleHeader();
  const showingHeader = (state: CollapsibleHeaderState) => {
    if (state === -1) return style.hidden;
    if (state === 0) return style.topOfPage;
    return style.visible;
  };

  return (
    <div className={style.page}>
      <header className={`${style.header} ${showingHeader(collapsibleHeader)}`}>entête de pages</header>
      <main className={style.main}>
        <Outlet />
      </main>
      <footer>about</footer>
    </div>
  );
}
