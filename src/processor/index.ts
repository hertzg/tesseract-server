import {
  IWorker,
  OCREngineMode,
  Options,
  PageSegmentationMethod,
} from './worker';
import {
  Options as GenericPoolSettings,
  Pool as GenericPool,
} from 'generic-pool';
import { Readable } from 'stream';
import { optionsToArgs } from './worker/options';
import { TesseractResult } from './worker/process';
import { createWorkerPool } from './createWorkerPool';
import argv from '../argv';
import { ensureEndOfLine, LineEnding } from './ensureEndOfLine';

export interface ProcessorOptions {
  pool?: {
    min?: number;
    max?: number;
  };
}

export const createProcessor = (options: ProcessorOptions): IProcessor => {
  return new Processor({
    lineEndings: argv['processor.lineEndings'] as ProcessorSettingsLineEndings,
    pool: {
      min: options?.pool?.min || 0,
      max: options?.pool?.max || 2,
      testOnBorrow: true,
      testOnReturn: true,
      idleTimeoutMillis: argv['pool.default.idleTimeoutMillis'],
      evictionRunIntervalMillis: argv['pool.default.evictionRunIntervalMillis'],
    },
  });
};

export interface IProcessor {
  execute(options: Options, input: Readable): Promise<TesseractResult>;

  status(): Promise<ProcessorStatus>;
}

export interface ProcessorStatus {
  pools: {
    args: string;
    status: PoolStatus;
  }[];
}

export interface PoolStatus {
  spareResourceCapacity: number;
  size: number;
  available: number;
  borrowed: number;
  pending: number;
  max: number;
  min: number;
}

export const enum ProcessorSettingsLineEndings {
  AUTO = 'auto',
  LF = 'lf',
  CRLF = 'crlf',
}

export interface ProcessorSettings {
  lineEndings: ProcessorSettingsLineEndings;
  pool: GenericPoolSettings;
}

class Processor implements IProcessor {
  private pools = new Map<string, GenericPool<IWorker>>();

  constructor(private settings: ProcessorSettings) {}

  status = async (): Promise<ProcessorStatus> => {
    return {
      pools: Array.from(this.pools.entries()).map(([args, pool]) => {
        const p = pool as any;
        return {
          args,
          resources: Array.from(p._allObjects as Set<any>).map(resource => {
            return {
              pid: resource.obj._proc.pid,
              killed: resource.obj._proc.killed,
              state: resource.state,
              creationTime: resource.creationTime,
              lastReturnTime: resource.lastReturnTime,
              lastBorrowTime: resource.lastBorrowTime,
              lastIdleTime: resource.lastIdleTime,
            };
          }),
          status: {
            spareResourceCapacity: pool.spareResourceCapacity,
            size: pool.size,
            available: pool.available,
            borrowed: pool.borrowed,
            pending: pool.pending,
            max: pool.max,
            min: pool.min,
          },
        };
      }),
    };
  };

  private _getPool = async (
    options: Options,
  ): Promise<GenericPool<IWorker>> => {
    const key = optionsToArgs(options).join(' ');
    if (!this.pools.has(key)) {
      const settings: GenericPoolSettings = {
        ...this.settings.pool,
      };
      console.log('worker: new pool %j with %j', key, settings);
      const pool = createWorkerPool(options, settings);
      this.pools.set(key, pool);
    }

    return this.pools.get(key) as any;
  };

  private _treatLineEndings = (result: TesseractResult) => {
    if (this.settings.lineEndings === ProcessorSettingsLineEndings.AUTO) {
      return result;
    }

    const targetEOL =
      this.settings.lineEndings === ProcessorSettingsLineEndings.LF
        ? LineEnding.LF
        : LineEnding.CRLF;
    const { stdout, stderr } = result;
    return {
      ...result,
      stdout: ensureEndOfLine(stdout, targetEOL),
      stderr: ensureEndOfLine(stderr, targetEOL),
    };
  };

  public execute = async (
    options: Options,
    input: Readable,
  ): Promise<TesseractResult> => {
    const pool = await this._getPool(options);
    const instance = await pool.acquire();
    const result = await instance.execute(input);
    await pool.release(instance);
    return this._treatLineEndings(result);
  };
}

export { Options, OCREngineMode, PageSegmentationMethod };
