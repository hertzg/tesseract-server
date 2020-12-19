const { applyTaggingStrategy, joinWithRepositories } = require('./tags');
const { getConfig, setOutput, writeInfo, fail } = require('./io');

const { ref, repositories, taggingStrategy, branchPrefix } = getConfig();

const strategyTags = applyTaggingStrategy(ref, taggingStrategy, branchPrefix);

if (!strategyTags.length) {
  fail(`Strategy (${taggingStrategy}) produced no tags for git-ref "${ref}"`);
}

const tags = joinWithRepositories(strategyTags, repositories);
writeInfo(JSON.stringify({ outputs: { 'image-tags': tags } }));

setOutput('image-tags', tags.join('\n'));
