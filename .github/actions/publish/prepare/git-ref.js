const parseRef = ref => {
  const [, type, ...rest] = ref.split('/');
  return [type, rest.join('/')];
};

const isRefType = (ref, type) => parseRef(ref)[0] === type;
const isHead = ref => isRefType(ref, 'heads');
const isBranch = (ref, branch) => isHead(ref) && parseRef(ref)[1] === branch;
const isTag = ref => isRefType(ref, 'tags');

module.exports = {
  parseRef,
  isRefType,
  isHead,
  isBranch,
  isTag,
};
