import { configure, getConsoleSink, getLogger } from "@logtape/logtape";
import argv from "./argv/index.ts";
import { createProviders } from "./providers/index.ts";
import { createProcessor } from "./processor/index.ts";
import { createHealthChecker } from "./health.ts";
import { getBuildInfo } from "./build.ts";

await configure({
  sinks: {
    console: getConsoleSink(),
  },
  loggers: [
    {
      category: "logtape",
      sinks: ["console"],
      lowestLevel: "warning",
    },
    {
      category: "tesseract-server",
      sinks: ["console"],
      lowestLevel: "info",
    },
  ],
});

const build = getBuildInfo();
const logger = getLogger("tesseract-server");
logger.info(
  `Starting tesseract-server v${build.version} (${build.ref}@${
    build.commit.substring(0, 7)
  })`,
);

const processor = createProcessor({
  pool: {
    min: argv["pool.default.min"],
    max: argv["pool.default.max"],
  },
});

const healthChecker = createHealthChecker();

const provider = createProviders({
  processor,
  healthChecker,
});

provider.start();
