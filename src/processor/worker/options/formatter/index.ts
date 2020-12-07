import Path from 'path';

export const stringify = <T>(value: T) => String(value);

export const languages = <T extends string[]>(languages: T) =>
  languages.join('+');

export const resolve = <T extends string>(pathOrFile: T) =>
  Path.resolve(pathOrFile);

export const parameter = <K extends string, V extends string>(key: K, val: V) =>
  [stringify(key), stringify(val)].join('=');

export * from './as';
