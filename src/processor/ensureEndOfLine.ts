export const enum LineEnding {
  LF = '\n',
  CRLF = '\r\n',
}

const EOL_REGEX = /(\r?\n|\r)/g;

export const ensureEndOfLine = (input: Buffer, eol: LineEnding): Buffer =>
  Buffer.from(input.toString('utf8').replace(EOL_REGEX, eol));
