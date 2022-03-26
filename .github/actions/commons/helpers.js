const { isBranch, isTag, isHead, isPull } = require('./git-ref');

const isMaster = parsedRef => isBranch(parsedRef, 'master');
const isVersionTag = parsedRef => isTag(parsedRef) && parsedRef[1].startsWith('v');
const isPullRequest = parsedRef => isPull(parsedRef);

const REF_TYPE = {
  VERSION_TAG: 'version-tag',
  MASTER_BRANCH: 'master-branch',
  NON_MASTER_BRANCH: 'non-master-branch',
  PULL_REQUEST: 'pull-request',
};

const getRefType = parsedRef => {
  switch (true) {
    case isVersionTag(parsedRef):
      return REF_TYPE.VERSION_TAG;
    case isMaster(parsedRef):
      return REF_TYPE.MASTER_BRANCH;
    case isHead(parsedRef):
      return REF_TYPE.NON_MASTER_BRANCH;
    case isPullRequest(parsedRef):
      return REF_TYPE.PULL_REQUEST;
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
