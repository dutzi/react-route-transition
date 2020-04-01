import { useLayoutEffect, useContext } from 'react';
import { ITransitionOptions } from './types';
import { TransitionContext } from './TransitionProvider';

export default function(options: ITransitionOptions) {
  const { listeners } = useContext(TransitionContext);

  useLayoutEffect(() => {
    listeners.push(...options.handlers);
    console.log('push listenrs', options.handlers);
    console.log({ listeners });

    return () => {
      options.handlers.forEach(listener => {
        listeners.splice(listeners.indexOf(listener));
      });
    };
  }, []);
}
