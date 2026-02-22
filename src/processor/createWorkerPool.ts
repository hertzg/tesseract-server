import { createWorker, IWorker, Options } from "./worker/index.ts";
import {
  createPool as createGenericPool,
  Options as GenericPoolSettings,
} from "generic-pool";

export const createWorkerPool = (
  options: Options,
  settings: GenericPoolSettings = { min: 0, max: 10, testOnReturn: true },
) => {
  return createGenericPool<IWorker>(
    {
      // deno-lint-ignore require-await
      create: async () => {
        return createWorker(options);
      },
      // deno-lint-ignore require-await
      validate: async (worker: IWorker) => {
        return worker.validate();
      },
      // deno-lint-ignore require-await
      destroy: async (worker: IWorker) => {
        worker.destroy();
      },
    },
    settings,
  );
};
