const { isBranch, isTag, isHead } = require('./git-ref');

const isMaster = parsedRef => isBranch(parsedRef, 'master');
const isVersionTag = parsedRef => isTag(parsedRef) && parsedRef[1].startsWith('v');

const REF_TYPE = {
  VERSION_TAG: 'version-tag',
  MASTER_BRANCH: 'master-branch',
  NON_MASTER_BRANCH: 'non-master-branch',
};

const getRefType = parsedRef => {
  switch (true) {
    case isVersionTag(parsedRef):
      return REF_TYPE.VERSION_TAG;
    case isMaster(parsedRef):
      return REF_TYPE.MASTER_BRANCH;
    case isHead(parsedRef):
      return REF_TYPE.NON_MASTER_BRANCH;
    default:
      return;
  }
};

module.exports = {
  REF_TYPE,
  isMaster,
  isVersionTag,
  getRefType,
};
