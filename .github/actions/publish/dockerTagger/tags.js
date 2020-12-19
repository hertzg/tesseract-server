const { parseRef } = require('./git-ref');
const { REF_TYPE, getRefType } = require('./helpers');

const refTypeTag = (refType, parsedRef, branchPrefix) => {
  switch (refType) {
    case REF_TYPE.VERSION_TAG:
      return [parsedRef[1]];
    case REF_TYPE.MASTER_BRANCH:
      return ['master'];
    case REF_TYPE.NON_MASTER_BRANCH:
      return [`${branchPrefix}${parsedRef[1]}`];
  }
};

const latestTag = refType =>
  refType === REF_TYPE.VERSION_TAG ? ['latest'] : [];

const getTags = (parsedRef, branchPrefix) => {
  const refType = getRefType(parsedRef);
  return [
    ...refTypeTag(refType, parsedRef, branchPrefix),
    ...latestTag(refType),
  ];
};

const combine = (imageNames, tags) =>
  tags
    .flatMap(tag => imageNames.map(image => [image, tag]))
    .map(([image, tag]) => `${image}:${tag}`);

const getTagMatrix = (ref, imageNames, branchPrefix) => {
  const parsedRef = parseRef(ref);
  return combine(imageNames, getTags(parsedRef, branchPrefix));
};

module.exports = {
  getTagMatrix,
};
