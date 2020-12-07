import Yargs from 'yargs';
import { tmpdir } from 'os';

export default Yargs(process.argv).options({
  'pool-min': {
    default: 0,
    type: 'number',
  },
  'pool-max': {
    default: 2,
    type: 'number',
  },
  'http.tmp-dir': {
    default: tmpdir(),
    type: 'string',
  },
}).argv;
