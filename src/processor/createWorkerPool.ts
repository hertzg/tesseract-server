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
        return createWorker(options);
      },
      validate: async (worker: IWorker) => {
        return worker.validate();
      },
      destroy: async (worker: IWorker) => {
        worker.destroy();
      },
    },

    settings,
  );
};
