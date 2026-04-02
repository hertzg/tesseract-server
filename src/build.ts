export interface BuildInfo {
  version: string;
  commit: string;
}

const readJson = async (
  path: string,
): Promise<Record<string, unknown> | null> => {
  try {
    return JSON.parse(await Deno.readTextFile(path));
  } catch {
    return null;
  }
};

export const getBuildInfo = async (): Promise<BuildInfo> => ({
  version: String((await readJson("deno.json"))?.version ?? "unknown"),
  commit: String((await readJson("build.json"))?.commit ?? "dev"),
});
