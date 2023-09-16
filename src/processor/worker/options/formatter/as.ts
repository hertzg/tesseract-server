export const asArgument =
  <T>(name: string, convert: (value: T) => string) =>
  (value: T): string[] => [name, convert(value)];

export const asArguments =
  <TMap extends { [key: string]: string }>(
    name: string,
    convert: (key: string, value: string) => string,
  ) =>
  (map: TMap): string[] =>
    Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .flatMap(([key, value]) => [name, convert(key, value)]);
