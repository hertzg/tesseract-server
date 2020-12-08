import argv from './argv';
import { createProviders } from './providers';
import { createProcessor } from './processor';

const processor = createProcessor({
  pool: {
    min: argv['pool.default.min'],
    max: argv['pool.default.max'],
  },
});

const provider = createProviders({
  processor,
});

provider.start();
