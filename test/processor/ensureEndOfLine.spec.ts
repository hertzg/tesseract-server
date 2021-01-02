import {
  ensureEndOfLine,
  LineEnding,
} from '../../src/processor/ensureEndOfLine';

describe('ensureEndOfLine', () => {
  it('should ensure LF line endings', () => {
    expect(
      ensureEndOfLine(
        Buffer.from(`lf\ncr+lf\r\ncr\rlf+crlf+cr\n\n\r\r`),
        LineEnding.LF,
      ).toString('utf-8'),
    ).toBe(`lf\ncr+lf\ncr\nlf+crlf+cr\n\n\n\n`);
  });

  it('should ensure CRLF line endings', () => {
    expect(
      ensureEndOfLine(
        Buffer.from(`lf\ncr+lf\r\ncr\rlf+crlf+cr\n\n\r\r`),
        LineEnding.CRLF,
      ).toString('utf-8'),
    ).toBe(`lf\r\ncr+lf\r\ncr\r\nlf+crlf+cr\r\n\r\n\r\n\r\n`);
  });
});
