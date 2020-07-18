import { TPathOrPaths } from './types';
import { useContext, useCallback } from 'react';
import * as History from 'history';
import { TransitionContext } from './TransitionProvider';

function arrarizePath(pathOrPaths: TPathOrPaths) {
  if (typeof pathOrPaths === 'string' || pathOrPaths instanceof RegExp) {
    return [pathOrPaths];
  }

  return pathOrPaths ?? [];
}

function removeSearch(path: History.Path | RegExp) {
  if (typeof path === 'string') {
    return path.split('?')[0];
  }

  return path;
}

function removeSearchArray(paths: (History.Path | RegExp)[]) {
  return paths.map(removeSearch);
}

function hasPath(pathOrPaths: TPathOrPaths, path: History.Path) {
  const pathsArray = removeSearchArray(arrarizePath(pathOrPaths));

  if (pathsArray.indexOf('*') !== -1) {
    return true;
  }

  if (
    pathsArray
      .filter((path) => typeof path === 'string')
      .indexOf(removeSearch(path)) !== -1
  ) {
    return true;
  }

  if (
    pathsArray
      .filter((path) => path instanceof RegExp)
      .find((currentPath) => (currentPath as RegExp).test(path))
  ) {
    return true;
  }

  return false;
}

export default function () {
  const { listeners, location, push: wrappedPush } = useContext(
    TransitionContext
  );

  const push = useCallback(
    async (path: History.Path, state?: History.LocationState) => {
      if (path !== location.pathname) {
        await Promise.all(
          listeners
            .filter(
              (listener) =>
                hasPath(listener.path, location.pathname) ||
                (hasPath(listener.from, location.pathname) &&
                  hasPath(listener.to, path))
            )
            .filter((listener) => !!listener.onLeave)
            .map((listener) => listener.onLeave!())
        );
      }

      wrappedPush(path, state);

      if (path !== location.pathname) {
        await Promise.all(
          listeners
            .filter(
              (listener) =>
                hasPath(listener.path, path) ||
                (hasPath(listener.from, location.pathname) &&
                  hasPath(listener.to, path))
            )
            .filter((listener) => !!listener.onEnter)
            .map((listener) => listener.onEnter!())
        );
      }
    },
    []
  );

  return {
    push,
  };
}
