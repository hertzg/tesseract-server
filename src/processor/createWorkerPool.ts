import { createWorker, Options, IWorker } from './worker';
import {
  createPool as createGenericPool,
  Options as GenericPoolSettings,
} from 'generic-pool';

export const createWorkerPool = (
  options: Options,
  settings: GenericPoolSettings = { min: 0, max: 10, testOnReturn: true },
) => {
  return createGenericPool<IWorker>(
    {
      create: async () => {
        console.log('pool: create');
        return createWorker(options);
      },
      validate: async (worker: IWorker) => {
        console.log('pool: validate');
        return worker.validate();
      },
      destroy: async (worker: IWorker) => {
        console.log('pool: destroy');
        worker.destroy();
      },
    },

    settings,
  );
};
