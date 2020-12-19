const { applyTaggingStrategy, joinWithRepositories } = require('./tags');
const { getConfig, setOutput } = require('./io');

const { ref, repositories, taggingStrategy, branchPrefix } = getConfig();

const strategyTags = applyTaggingStrategy(ref, taggingStrategy, branchPrefix);

if (!strategyTags.length) {
  throw new Error(
    `Strategy (${taggingStrategy}) produced no tags for git-ref "${ref}"`,
  );
}

const tags = joinWithRepositories(strategyTags, repositories);
setOutput('image-tags', tags.join('\n'));
