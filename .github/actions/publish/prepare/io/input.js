const {} = require('./output');

const getRawInput = name =>
  process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`];

const getInput = (name, defaultValue = '') => getRawInput(name) || defaultValue;

const getInputLines = (name, separator = '\n') => {
  const input = getInput(name).trim();
  return input ? input.split(separator).map(line => line.trim()) : [];
};

const getInputEnumLines = (name, options = [], separator = '\n') => {
  const inputs = getInputLines(name, separator);
  if (!inputs.every(input => options.includes(input))) {
    fail(`${name} can't be ${inputs}. Only ${options.join(', ')} allowed`);
  }
  return inputs;
};

module.exports = {
  getInput,
  getInputEnumLines,
  getInputLines,
};
