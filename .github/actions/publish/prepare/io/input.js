const {} = require('./output');

const getRawInput = name =>
  process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`];

const getInput = (name, defaultValue = '') => getRawInput(name) || defaultValue;

const getInputLines = (name, separator = '\n') => {
  const input = getInput(name).trim();
  return input ? input.split(separator).map(line => line.trim()) : [];
};

const getInputEnum = (name, values = [], defaultValue = values[0]) => {
  const input = getInput(name, defaultValue);
  if (!values.includes(input)) {
    fail(`${name} can't be ${input}. Only ${values.join(', ')} allowed`);
  }
  return input;
};

module.exports = {
  getInput,
  getInputEnum,
  getInputLines,
};
