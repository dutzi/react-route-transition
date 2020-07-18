import * as History from 'history';

export type TPathOrPaths =
  | History.Path
  | RegExp
  | (History.Path | RegExp)[]
  | undefined;

export interface ITransitionListener {
  path?: TPathOrPaths;
  from?: TPathOrPaths;
  to?: TPathOrPaths;
  onEnter?: () => Promise<void>;
  onLeave?: () => Promise<void>;
}

export interface ITransitionOptions {
  handlers: ITransitionListener[];
}

// export interface IHistory {
//   push: (path: History.Path, state: History.LocationState)
// }

export type TPush = (path: History.Path, state: History.LocationState) => void;
export type TLocation = { pathname: History.Path };
// export type TLocation<S = History.LocationState> = History.Location<S>;
