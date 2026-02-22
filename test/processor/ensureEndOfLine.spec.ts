import { assertEquals } from '@std/assert';
import {
  ensureEndOfLine,
  LineEnding,
} from '../../src/processor/ensureEndOfLine.ts';

Deno.test('ensureEndOfLine - should ensure LF line endings', () => {
  assertEquals(
    ensureEndOfLine(
      Buffer.from(`lf\ncr+lf\r\ncr\rlf+crlf+cr\n\n\r\r`),
      LineEnding.LF,
    ).toString('utf-8'),
    `lf\ncr+lf\ncr\nlf+crlf+cr\n\n\n\n`,
  );
});

Deno.test('ensureEndOfLine - should ensure CRLF line endings', () => {
  assertEquals(
    ensureEndOfLine(
      Buffer.from(`lf\ncr+lf\r\ncr\rlf+crlf+cr\n\n\r\r`),
      LineEnding.CRLF,
    ).toString('utf-8'),
    `lf\r\ncr+lf\r\ncr\r\nlf+crlf+cr\r\n\r\n\r\n\r\n`,
  );
});
