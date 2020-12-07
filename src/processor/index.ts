import { IWorker, Options } from './worker';
import {
  Options as GenericPoolSettings,
  Pool as GenericPool,
} from 'generic-pool';
import { Readable } from 'stream';
import { optionsToArgs } from './worker/options';
import { TesseractResult } from './worker/process';
import { createWorkerPool } from './createWorkerPool';

export interface ProcessorOptions {
  pool?: {
    min?: number;
    max?: number;
  };
}

export const createProcessor = (options: ProcessorOptions): IProcessor => {
  return new Processor({
    min: options?.pool?.min || 0,
    max: options?.pool?.max || 1,
  });
};

export interface IProcessor {
  execute(options: Options, input: Readable): Promise<TesseractResult>;
}

class Processor implements IProcessor {
  private pools = new Map<string, GenericPool<IWorker>>();

  constructor(
    private _poolSettings: GenericPoolSettings = {
      min: 0,
      max: 2,
      testOnReturn: true,
    },
  ) {}

  private _getPool = async (
    options: Options,
  ): Promise<GenericPool<IWorker>> => {
    const key = optionsToArgs(options).join(' ');
    if (!this.pools.has(key)) {
      const settings: GenericPoolSettings = {
        ...this._poolSettings,
      };
      console.log('worker: new pool %j with %j', key, settings);
      const pool = createWorkerPool(options, settings);
      this.pools.set(key, pool);
    }

    return this.pools.get(key) as any;
  };

  public execute = async (
    options: Options,
    input: Readable,
  ): Promise<TesseractResult> => {
    const pool = await this._getPool(options);
    const instance = await pool.acquire();
    const result = await instance.execute(input);
    await pool.release(instance);
    return result;
  };
}

export { Options };
