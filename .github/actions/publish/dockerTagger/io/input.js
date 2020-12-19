const { fail } = require('./output');

const getRawInput = name =>
  process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`];

const getInput = (name, defaultValue = '') => getRawInput(name) || defaultValue;

const getInputLines = (name, separator = '\n') => {
  const input = getInput(name).trim();
  return input ? input.split(separator).map(line => line.trim()) : [];
};

const validateEnum = (name, value, options = []) =>
  options.includes(value)
    ? value
    : fail(`${name} can't be ${value}. Only ${options.join(', ')} allowed`);

const getInputEnum = (name, options = [], defaultValue = '\n') =>
  validateEnum(name, getInput(name, defaultValue), options);

module.exports = {
  getInput,
  getInputEnum,
  getInputLines,
};
