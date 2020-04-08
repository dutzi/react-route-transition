import React from 'react';
import { ITransitionListener, TPush, TLocation } from './types';

const listeners: ITransitionListener[] = [];

const TransitionContext = React.createContext<{
  listeners: ITransitionListener[];
  push: TPush;
  location: TLocation;
}>({
  listeners,
  push: (path, state) => window.history.pushState(state, '', path),
  location: window.location,
});

function TransitionProvider({
  children,
  push,
  location,
}: {
  children: React.ReactNode;
  push: TPush;
  location: TLocation;
}) {
  return (
    <TransitionContext.Provider value={{ listeners, push, location }}>
      {children}
    </TransitionContext.Provider>
  );
}

export { TransitionContext, TransitionProvider };
