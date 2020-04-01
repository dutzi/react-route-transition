import * as History from 'history';
export declare type TPathOrPaths = History.Path | History.Path[] | undefined;
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
export declare type TPush = (path: History.Path, state: History.LocationState) => void;
export declare type TLocation = {
    pathname: History.Path;
};
