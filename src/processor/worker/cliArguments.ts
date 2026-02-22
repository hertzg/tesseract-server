import { Options, optionsToArgs } from "./options/index.ts";

export const cliArguments = (
  input: string,
  outputBase: string,
  options: Options,
  presets: string[],
) => [input, outputBase, ...optionsToArgs(options), ...presets];
