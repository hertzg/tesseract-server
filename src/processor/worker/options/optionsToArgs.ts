import { Options } from './index';
import {
  asArgument,
  asArguments,
  languages,
  parameter,
  resolve,
  stringify,
} from './formatter';

type OptionFormatterMap = {
  [key in keyof Options]: (value: Exclude<Options[key], undefined>) => string[];
} & {
  [key: string]: (value: any) => string[];
};

const formatMap: OptionFormatterMap = {
  languages: asArgument('-l', languages),
  dpi: asArgument('--dpi', stringify),
  pageSegmentationMethod: asArgument('--psm', stringify),
  ocrEngineMode: asArgument('--oem', stringify),
  tessDataDir: asArgument('--tessdata-dir', resolve),
  userPatternsFile: asArgument('--user-patterns', resolve),
  userWordsFile: asArgument('--user-words', resolve),
  configParams: asArguments('-c', parameter),
};

export const optionsToArgs = (options: Options): string[] =>
  Object.entries(options).flatMap(([name, value]) => formatMap[name](value));
