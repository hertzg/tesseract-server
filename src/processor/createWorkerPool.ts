import { createWorker, Options, IWorker } from './worker/index.ts';
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
      create: () => {
        return createWorker(options);
      },
      validate: (worker: IWorker) => {
        return worker.validate();
      },
      destroy: (worker: IWorker) => {
        worker.destroy();
      },
    },

    settings,
  );
};
