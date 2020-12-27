const parseRef = ref => {
  const [, type, ...rest] = ref.split('/');
  return [type, rest.join('/')];
};

const isRefType = (parsedRef, type) => parsedRef[0] === type;
const isHead = parsedRef => isRefType(parsedRef, 'heads');
const isBranch = (parsedRef, branch) =>
  isHead(parsedRef) && parsedRef[1] === branch;
const isTag = parsedRef => isRefType(parsedRef, 'tags');

module.exports = {
  parseRef,
  isRefType,
  isHead,
  isBranch,
  isTag,
};
