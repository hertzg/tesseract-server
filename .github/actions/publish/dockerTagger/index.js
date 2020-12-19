const { getTagMatrix } = require('./tags');
const { getConfig, setOutput, writeInfo, fail } = require('./io');

const { gitRef, imageNames } = getConfig();

const tags = getTagMatrix(gitRef, imageNames, 'git-');
if (!tags.length) {
  fail(
    `Strategy (${JSON.stringify(
      tags,
    )}) produced no tags for git-ref "${gitRef}"`,
  );
}

writeInfo(JSON.stringify({ outputs: { 'image-tags': tags } }, null, 2));
setOutput('image-tags', tags.join('\n'));
