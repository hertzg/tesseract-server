const { EOL } = require('os');

const sanitize = input => {
  if (input === null || input === undefined) {
    return '';
  } else if (typeof input === 'string' || input instanceof String) {
    return input;
  }
  return JSON.stringify(input);
};

const escapeData = s =>
  sanitize(s)
    .replace(/%/g, '%25')
    .replace(/\r/g, '%0D')
    .replace(/\n/g, '%0A');

const escapeProperty = s =>
  sanitize(s)
    .replace(/%/g, '%25')
    .replace(/\r/g, '%0D')
    .replace(/\n/g, '%0A')
    .replace(/:/g, '%3A')
    .replace(/,/g, '%2C');

const formatCommand = (name, value, props = {}) =>
  `::${name} ${formatProperties(props)}::${escapeData(value)}`;

const formatProperties = props =>
  Object.entries(props)
    .map(([key, prop]) => `${key}=${escapeProperty(prop)}`)
    .join(',');

const writeLine = line => process.stdout.write(`${line}${EOL}`);

const setOutput = (name, data) =>
  writeLine(formatCommand('set-output', data, { name }));

const writeDebug = message => writeLine(formatCommand('debug', message));

const writeInfo = message => writeLine(message);

const ensureString = reason =>
  reason instanceof Error ? reason.toString() : reason;

const writeWarning = message =>
  writeLine(formatCommand('warning', ensureString(message)));

const writeError = message =>
  writeLine(formatCommand('error', ensureString(message)));

const fail = reason => {
  writeError(reason);
  process.exit(1);
};

module.exports = {
  setOutput,
  writeDebug,
  writeInfo,
  writeWarning,
  writeError,
  fail,
};
