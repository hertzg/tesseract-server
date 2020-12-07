import { ChildProcessWithoutNullStreams } from 'child_process';
import { spawnTesseract } from './spawnTesseract';
import { Readable } from 'stream';
import { bufferOutputs } from './buffer';
import Assert from 'assert';

export const enum ProcessState {
  WAITING = 0,
  WORKING = 1,
  FINISHED = 2,
}

export type TesseractResult = {
  exit: { code: number | null; signal: NodeJS.Signals | null };
  stdout: Buffer;
  stderr: Buffer;
};

export interface ITesseract {
  execute(input: Readable): Promise<TesseractResult>;

  validate(): boolean;

  destroy(): void;
}

export const createTesseract = (args: string[], cwd: string): ITesseract => {
  return new Tesseract(args, cwd);
};

class Tesseract implements ITesseract {
  private readonly _proc: ChildProcessWithoutNullStreams;
  private _state: ProcessState = ProcessState.WAITING;

  private _error: Error | undefined;
  private _exitCode: number | null = null;
  private _exitSignal: NodeJS.Signals | null = null;
  private _buffData?: {
    stdout: Buffer;
    stderr: Buffer;
  };

  private readonly _promise: Promise<TesseractResult>;
  private _resolve: (data: TesseractResult) => void = () => {};
  private _reject: (err: Error) => void = () => {};

  constructor(private readonly args: string[], private readonly cwd: string) {
    this._proc = spawnTesseract(this.args, this.cwd);

    this._promise = new Promise<TesseractResult>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });

    this._proc.once('error', this._onError);
    this._proc.once('exit', this._onExit);
    bufferOutputs(this._proc, (err, data) => {
      Assert.ifError(err);
      Assert(data);

      const { stdout, stderr } = data;
      Assert(stdout);
      Assert(stderr);

      this._buffData = {
        stderr,
        stdout,
      };
    });
  }

  private _onError = (error: Error) => {
    this._error = error;
    this._finalize();
  };

  private _onExit = (code: number | null, signal: NodeJS.Signals | null) => {
    this._exitCode = code;
    this._exitSignal = signal;
    this._finalize();
  };

  private _finalize() {
    if (this._state !== ProcessState.FINISHED) {
      setImmediate(this._finish);
    }
    this._state = ProcessState.FINISHED;
  }

  private _finish = () => {
    if (this._error) {
      this._reject(this._error);
      return;
    }

    if (this._buffData) {
      this._resolve({
        exit: {
          code: this._exitCode,
          signal: this._exitSignal,
        },
        ...this._buffData,
      });
    }
  };

  private _kickoff(input: Readable): void {
    if (this._state !== ProcessState.WAITING) {
      return;
    }

    this._state = ProcessState.WORKING;
    input.pipe(this._proc.stdin);
  }

  public execute = (input: Readable): Promise<TesseractResult> => {
    console.log('execute on pid %j', this._proc.pid);
    this._kickoff(input);
    return this._promise;
  };

  public validate = (): boolean => {
    return this._state === ProcessState.WAITING;
  };

  public destroy = () => {
    this._proc.kill('SIGINT');
  };
}
