import ChildProcess, {
  ChildProcessWithoutNullStreams,
} from "node:child_process";

export const spawnWithWorkingDirectory = (
  command: string,
  args: readonly string[],
  workingDirectory: string,
): ChildProcessWithoutNullStreams =>
  ChildProcess.spawn(command, args, {
    cwd: workingDirectory,
  });
