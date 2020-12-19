const { getInput, getInputLines, getInputEnum } = require('./input');
const { setOutput, fail } = require('./output');

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

  const taggingStrategy = getInputEnum(
    'tag-as-latest',
    TAGGING_STRATEGIES,
    'any-tag',
  );
  const branchPrefix = getInput('branch-tag-prefix', 'git-');

  return {
    ref,
    repositories,
    taggingStrategy,
    branchPrefix,
  };
};

module.exports = {
  getInput,
  getInputLines,
  getConfig,
  setOutput,
  fail,
};
