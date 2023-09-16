import { ChildProcessWithoutNullStreams } from "child_process";
import BufferList from "bl";
import Async, { AsyncFunction } from "async";
import BufferListStream from "bl";

export interface Streams {
  [key: string]: NodeJS.ReadableStream;
}

const blStream = (
  stream: NodeJS.ReadableStream,
  callback: (err: Error, buffer: Buffer) => void,
): BufferList => stream.pipe<any>(new BufferList(callback));

const mapObjectEntries = <TMapped, TValue>(
  obj: { [key: string]: TValue },
  mapper: (
    value: [string, TValue],
    index: number,
    array: [string, TValue][],
  ) => [string, TMapped],
): { [key: string]: TMapped } => {
  return Object.fromEntries(Object.entries(obj).map(mapper));
};

const taskify = (streams: Streams): { [key: string]: AsyncFunction<Buffer> } =>
  mapObjectEntries(streams, ([name, stream]) => [
    name,
    (done) => blStream(stream, done),
  ]);

export const blStreams = (
  streams: Streams,
  callback: (
    err: Error | undefined,
    bld: { [key: string]: Buffer | undefined },
  ) => void,
) => Async.parallel(taskify(streams), callback);

export const bufferOutputs = (
  proc: ChildProcessWithoutNullStreams,
  callback: (
    err: Error | undefined,
    data?: { stderr?: Buffer; stdout?: Buffer },
  ) => void,
) => {
  blStreams(
    {
      stderr: proc.stderr,
      stdout: proc.stdout,
    },
    callback,
  );
};
