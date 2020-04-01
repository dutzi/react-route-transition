import * as History from 'history';
export default function (): {
    push: (path: string, state?: History.History.PoorMansUnknown) => Promise<void>;
};
