import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'url';

const RESOLVED_REGEX = /^\s+resolved\s(.*)$/g;

describe('yarn.lock', () => {
  it('should only have resolved urls from registry.npmjs.org', async () => {
    const lockfile = await readFile(join(__dirname, '../yarn.lock'), {
      encoding: 'utf8',
    });

    const matches = Array.from(lockfile.matchAll(RESOLVED_REGEX));
    matches
      .map(match => match[1]?.trim())
      .filter(url => url?.trim())
      .map(url => parse(url))
      .forEach(url => {
        expect(url.hostname).toBe('registry.npmjs.org');
      });
  });
});
