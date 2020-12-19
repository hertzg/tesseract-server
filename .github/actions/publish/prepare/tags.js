const { isHead, parseRef } = require('./git-ref');
const { isVersionTag, isMaster } = require('./helpers');

const applyTaggingStrategy = (ref, strategy, branchPrefix) => {
  const tags = [];

  const tagAsLatest = (...chosenStrategies) =>
    chosenStrategies.some(chosenStrategy =>
      strategy.includes(chosenStrategy),
    ) && tags.push('latest');

  switch (true) {
    case isVersionTag(ref):
      tags.push(parseRef(ref)[1]);
      tagAsLatest('any', 'any-tag');
      break;
    case isMaster(ref):
      tags.push('master');
      tagAsLatest('any', 'any-branch', 'only-master');
      break;
    case isHead(ref):
      tags.push(`${branchPrefix}${parseRef(ref)[1]}`);
      tagAsLatest('any', 'any-branch');
      break;
  }

  return tags;
};

const joinWithRepositories = (tags, repos) =>
  tags
    .flatMap(tag => repos.map(repo => [repo, tag]))
    .map(([repo, tag]) => `${repo}:${tag}`);

module.exports = {
  applyTaggingStrategy,
  joinWithRepositories,
};
