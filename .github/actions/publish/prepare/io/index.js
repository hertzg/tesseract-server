const { getInput, getInputLines, getInputEnumLines } = require('./input');
const {
  writeDebug,
  writeInfo,
  writeWarning,
  writeError,
  setOutput,
  fail,
} = require('./output');

const TAGGING_STRATEGIES = [
  'none',
  'any-tag',
  'any-branch',
  'only-master',
  'not-master',
];

const getConfig = () => {
  const ref = getInput('github-ref');
  const repositories = getInputLines('image-names');

  const taggingStrategies = getInputEnumLines(
    'tag-as-latest',
    TAGGING_STRATEGIES,
  );
  const branchPrefix = getInput('branch-tag-prefix', 'git-');

  return {
    ref,
    repositories,
    taggingStrategies,
    branchPrefix,
  };
};

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
