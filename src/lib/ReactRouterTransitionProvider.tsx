import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { TransitionProvider } from './TransitionProvider';

function ReactRouterTransitionProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const history = useHistory();
  const location = useLocation();

  return (
    <TransitionProvider push={history.push} location={location}>
      {children}
    </TransitionProvider>
  );
}

export { ReactRouterTransitionProvider };
