import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { TransitionProvider } from './TransitionProvider';

function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const history = useHistory();
  const location = useLocation();

  return (
    <TransitionProvider push={history.push} location={location}>
      {children}
    </TransitionProvider>
  );
}

export { RouteTransitionProvider };
