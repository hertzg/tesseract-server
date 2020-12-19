const { isBranch, isTag, parseRef } = require('./git-ref');

const isMaster = ref => isBranch(ref, 'master');
const isVersionTag = ref => isTag(ref) && parseRef(ref)[1].startsWith('v');

module.exports = {
  isMaster,
  isVersionTag,
};
