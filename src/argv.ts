import Yargs from 'yargs';
import { tmpdir } from 'os';

export default Yargs(process.argv)
  .parserConfiguration({ 'dot-notation': false, 'camel-case-expansion': false })
  .options({
    'pool.default.min': {
      default: 0,
      type: 'number',
    },
    'pool.default.max': {
      default: 2,
      type: 'number',
    },
    'pool.default.idleTimeoutMillis': {
      default: 5000,
      type: 'number',
    },
    'pool.default.evictionRunIntervalMillis': {
      default: 5000,
      type: 'number',
    },
    'http.upload.tmpDir': {
      default: tmpdir(),
      type: 'string',
    },
    'http.endpoint.status.enable': {
      default: true,
      type: 'boolean',
    },
    'http.endpoint.health.enable': {
      default: true,
      type: 'boolean',
    },
    'http.output.jsonSpaces': {
      default: 0,
      type: 'number',
    },
    'http.input.optionsField': {
      default: 'options',
      type: 'string',
    },
    'http.input.fileField': {
      default: 'file',
      type: 'string',
    },
  }).argv;
