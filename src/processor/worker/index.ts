import { createTesseract, ITesseract } from "./process/index.ts";
import { Options, optionsToArgs } from "./options/index.ts";
import process from "node:process";

export interface IWorker extends ITesseract {}

export const createWorker = (options: Options): IWorker => {
  return createTesseract(["-", "-", ...optionsToArgs(options)], process.cwd());
};

export * from "./options/index.ts";
