import { configure, getConsoleSink } from "@logtape/logtape";
import argv from "./argv/index.ts";
import { createProviders } from "./providers/index.ts";
import { createProcessor } from "./processor/index.ts";
import { createHealthChecker } from "./health.ts";

await configure({
  sinks: {
    console: getConsoleSink(),
  },
  loggers: [
    {
      category: "tesseract-server",
      sinks: ["console"],
      lowestLevel: "info",
    },
  ],
});

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
