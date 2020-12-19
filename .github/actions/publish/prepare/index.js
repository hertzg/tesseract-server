const { applyTaggingStrategies, joinWithRepositories } = require('./tags');
const { getConfig, setOutput, writeInfo, fail } = require('./io');

const { ref, repositories, taggingStrategies, branchPrefix } = getConfig();

const tagParts = applyTaggingStrategies(ref, taggingStrategies, branchPrefix);

if (!tagParts.length) {
  fail(
    `Strategy (${JSON.stringify(
      taggingStrategies,
    )}) produced no tags for git-ref "${ref}"`,
  );
}

const tags = joinWithRepositories(tagParts, repositories);
writeInfo(JSON.stringify({ outputs: { 'image-tags': tags } }));

setOutput('image-tags', tags.join('\n'));
