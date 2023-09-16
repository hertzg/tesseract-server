import { createYargs } from "../../src/argv";
import { join } from "path";
// @ts-ignore
import { findByTestId, getTestParam, parseMarkdown } from "./parser";

const RELATIVE_PATH_TO_README_MD = "../../README.md";

// Make sure OS reports /tmp as tmpdir
jest.mock("os", () => ({
  tmpdir: () => "/tmp",
}));

const usageFromReadme = async () =>
  findByTestId(
    await parseMarkdown(join(__dirname, RELATIVE_PATH_TO_README_MD)),
    "--help",
  );

const usageActual = async (columns: number) =>
  new Promise(
    (resolve) =>
      createYargs([])
        .wrap(columns)
        .exitProcess(false)
        .showHelp((s) => resolve(s)).argv,
  );

describe("README.md tests", () => {
  it("should have usage match actual --help output", async () => {
    const maybeMarkdownNode = await usageFromReadme();
    expect(maybeMarkdownNode).toBeTruthy();

    const node = maybeMarkdownNode as any;
    const usageFromMarkdown = node.value as string;

    const columns = Number(getTestParam(node.meta as string, "columns"));
    expect(columns).toBeTruthy();

    const actualGeneratedUsage = await usageActual(Number(columns));

    if (actualGeneratedUsage !== usageFromMarkdown) {
      console.log(actualGeneratedUsage);
    }

    expect(actualGeneratedUsage).toBe(usageFromMarkdown);
  });
});
