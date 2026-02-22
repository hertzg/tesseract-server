import { assert, assertEquals } from '@std/assert';
import { createYargs } from '../../src/argv/yargs.ts';
import { join, dirname, fromFileUrl } from 'node:path';
import { findByTestId, getTestParam, parseMarkdown } from './parser.ts';

const __dirname = dirname(fromFileUrl(import.meta.url));
const RELATIVE_PATH_TO_README_MD = '../../README.md';

// Override tmpdir to /tmp for deterministic help output
const origTmpdir = Deno.env.get('TMPDIR');
const origTemp = Deno.env.get('TEMP');
const origTmp = Deno.env.get('TMP');

const usageFromReadme = async () =>
  findByTestId(
    await parseMarkdown(join(__dirname, RELATIVE_PATH_TO_README_MD)),
    '--help',
  );

const usageActual = async (columns: number) =>
  new Promise(
    resolve =>
      createYargs([])
        .wrap(columns)
        .exitProcess(false)
        .showHelp(s => resolve(s)).argv,
  );

Deno.test('README.md - should have usage match actual --help output', async () => {
  // Set env vars so os.tmpdir() returns /tmp
  Deno.env.set('TMPDIR', '/tmp');
  Deno.env.delete('TEMP');
  Deno.env.delete('TMP');

  try {
    const maybeMarkdownNode = await usageFromReadme();
    assert(maybeMarkdownNode);

    const node = maybeMarkdownNode as any;
    const usageFromMarkdown = node.value as string;

    const columns = Number(getTestParam(node.meta as string, 'columns'));
    assert(columns);

    const actualGeneratedUsage = await usageActual(Number(columns));

    if (actualGeneratedUsage !== usageFromMarkdown) {
      console.log(actualGeneratedUsage);
    }

    assertEquals(actualGeneratedUsage, usageFromMarkdown);
  } finally {
    // Restore env vars
    if (origTmpdir !== undefined) Deno.env.set('TMPDIR', origTmpdir);
    else Deno.env.delete('TMPDIR');
    if (origTemp !== undefined) Deno.env.set('TEMP', origTemp);
    if (origTmp !== undefined) Deno.env.set('TMP', origTmp);
  }
});
