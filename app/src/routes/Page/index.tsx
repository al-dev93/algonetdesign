import { Outlet } from 'react-router-dom';

export function Page() {
  return (
    <>
      <header>entête de pages</header>
      <main>
        <Outlet />
      </main>
      <footer>about</footer>
    </>
  );
}
