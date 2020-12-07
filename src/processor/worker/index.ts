import { createTesseract, ITesseract } from './process';
import { Options, optionsToArgs } from './options';

export interface IWorker extends ITesseract {}

export const createWorker = (options: Options): IWorker => {
  return createTesseract(['-', '-', ...optionsToArgs(options)], process.cwd());
};

export * from './options';
