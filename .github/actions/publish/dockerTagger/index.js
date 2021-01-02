const { getTagMatrix } = require('../../commons/tags');
const {
  getInput,
  getInputLines,
  setOutput,
  writeInfo,
  fail,
} = require('../../commons/io');

const gitRef = getInput('git-ref');
const imageNames = getInputLines('image-names');

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
