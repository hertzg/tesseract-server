const { parseRef } = require('./git-ref');
const { REF_TYPE, getRefType } = require('./helpers');
const { createHash } = require('crypto');

const asTag = tag => {
  let sanitized = tag
    .replace(/([^a-z0-9_.-])/gi, '_') // invalid to _
    .replace(/(_+)/g, '_'); // remove consecutive _ chars

  // Replace with hash if longer than 80 chars
  // 80 chars is arbitrary just to allow
  if (sanitized.length > 80) {
    const hash = createHash('sha1')
      .update(tag)
      .digest('hex');
    return `${hash}`;
  }

  return sanitized;
};

const refTypeTag = (refType, parsedRef, branchPrefix) => {
  switch (refType) {
    case REF_TYPE.VERSION_TAG:
      return asTag(parsedRef[1]);
    case REF_TYPE.MASTER_BRANCH:
      return 'master';
    case REF_TYPE.NON_MASTER_BRANCH:
      return `${branchPrefix}${asTag(parsedRef[1])}`;
  }

  throw new Error('Unable to determine refTypeTag');
};

const latestTag = refType =>
  refType === REF_TYPE.VERSION_TAG ? ['latest'] : [];

const getTags = (parsedRef, branchPrefix) => {
  const refType = getRefType(parsedRef);
  return [refTypeTag(refType, parsedRef, branchPrefix), ...latestTag(refType)];
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
  refTypeTag,
  getTags,
};
