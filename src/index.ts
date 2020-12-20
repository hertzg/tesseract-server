import argv from './argv';
import { createProviders } from './providers';
import { createProcessor } from './processor';
import { createHealthChecker } from './health';

const processor = createProcessor({
  pool: {
    min: argv['pool.default.min'],
    max: argv['pool.default.max'],
  },
});

const healthChecker = createHealthChecker();

const provider = createProviders({
  processor,
  healthChecker,
});

provider.start();
