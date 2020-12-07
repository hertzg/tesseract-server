import { ChildProcessWithoutNullStreams } from 'child_process';

export const waitForExitOrError = (
  proc: ChildProcessWithoutNullStreams,
  callback: (
    err: Error | null | undefined,
    data?: { code: number | null; signal: NodeJS.Signals | null },
  ) => void,
) => {
  proc.once('error', err => {
    callback(err);
  });

  proc.once('exit', (code, signal) => {
    callback(undefined, { code, signal });
  });
};
