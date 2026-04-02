import FS from "node:fs";
import Path from "node:path";
import process from "node:process";

export interface BuildInfo {
  version: string;
  commit: string;
  ref: string;
}

export const getBuildInfo = (): BuildInfo => {
  let version = "unknown";
  try {
    const denoJsonPath = Path.resolve("deno.json");
    const denoJson = JSON.parse(FS.readFileSync(denoJsonPath, "utf-8"));
    version = denoJson.version || "unknown";
  } catch {
    // ignore
  }
  return {
    version,
    commit: process.env.BUILD_COMMIT || "dev",
    ref: process.env.BUILD_REF || "local",
  };
};
