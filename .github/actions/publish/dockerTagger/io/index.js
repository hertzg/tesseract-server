const { getInput, getInputLines } = require('./input');
const {
  writeDebug,
  writeInfo,
  writeWarning,
  writeError,
  setOutput,
  fail,
} = require('./output');

const getConfig = () => ({
  gitRef: getInput('git-ref'),
  imageNames: getInputLines('image-names'),
});

module.exports = {
  getInput,
  getInputLines,
  getConfig,
  writeDebug,
  writeInfo,
  writeWarning,
  writeError,
  setOutput,
  fail,
};
