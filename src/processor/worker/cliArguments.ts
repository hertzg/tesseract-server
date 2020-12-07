import { Options, optionsToArgs } from './options';

export const cliArguments = (
  input: string,
  outputBase: string,
  options: Options,
  presets: string[],
) => [input, outputBase, ...optionsToArgs(options), ...presets];
