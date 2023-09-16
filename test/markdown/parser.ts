import { parse } from 'remark';
import { selectAll } from 'unist-util-select';
import { readFile } from 'fs/promises';

export const findByTestId = (ast: ReturnType<typeof parse>, id: string) =>
  id.length
    ? selectAll('code[meta]', ast).find(node => {
        return (
          (node as unknown as any).meta as string | null | undefined
        )?.includes(`test-id="${id}"`);
      })
    : undefined;

const TEST_PARAM_REGEXP = /test-param-([^=]*)="([^"]*)"/g;

export const getTestParam = (meta: string, attribute: string) => {
  const match = Array.from(meta.matchAll(TEST_PARAM_REGEXP)).find(
    ([_, name]) => name === attribute,
  );
  return match ? match[2] : undefined;
};

export const parseMarkdown = async (path: string) => {
  return parse(await readFile(path));
};
