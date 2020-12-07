export interface Options {
  languages?: string[];
  dpi?: number;
  pageSegmentationMethod?: number;
  ocrEngineMode?: number;
  tessDataDir?: string;
  userPatternsFile?: string;
  userWordsFile?: string;
  configParams?: {
    [key: string]: string;
  };
}

export * from './constants';
export * from './optionsToArgs';
