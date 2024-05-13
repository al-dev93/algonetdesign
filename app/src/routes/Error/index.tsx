import { useRouteError } from 'react-router-dom';

export function Error() {
  const error = useRouteError() as { statusText: string; message: string };
  return (
    <div>
      <h1>Ooops</h1>
      <p>Désolé !!! une erreur s&apos;est produite</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
