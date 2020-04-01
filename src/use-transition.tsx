import { useEffect, useContext } from 'react';
import { ITransitionOptions } from './types';
import { TransitionContext } from './TransitionProvider';

export default function(options: ITransitionOptions) {
  const { listeners } = useContext(TransitionContext);

  useEffect(() => {
    listeners.push(...options.handlers);

    return () => {
      options.handlers.forEach(listener => {
        listeners.splice(listeners.indexOf(listener));
      });
    };
  }, []);
}
