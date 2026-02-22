import { ChildProcessWithoutNullStreams } from "node:child_process";
import { Buffer } from "node:buffer";

const collectStream = (stream: NodeJS.ReadableStream): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });

export const bufferOutputs = async (
  proc: ChildProcessWithoutNullStreams,
): Promise<{ stdout: Buffer; stderr: Buffer }> => {
  const [stdout, stderr] = await Promise.all([
    collectStream(proc.stdout),
    collectStream(proc.stderr),
  ]);
  return { stdout, stderr };
};
