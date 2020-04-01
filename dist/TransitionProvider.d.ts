import React from 'react';
import { ITransitionListener, TPush, TLocation } from './types';
declare const TransitionContext: React.Context<{
    listeners: ITransitionListener[];
    push: TPush;
    location: TLocation;
}>;
declare function TransitionProvider({ children, push, location, }: {
    children: React.ReactElement;
    push: TPush;
    location: TLocation;
}): JSX.Element;
export { TransitionContext, TransitionProvider };
