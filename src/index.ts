import argv from './argv';
import { createProviders } from './providers';
import { createProcessor } from './processor';

const processor = createProcessor({
  pool: {
    min: argv['pool-min'],
    max: argv['pool-max'],
  },
});

const provider = createProviders({
  processor,
});

provider.start();
