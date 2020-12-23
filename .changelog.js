const cc = require('conventional-changelog-conventionalcommits');
const versionRc = require('./.versionrc');

module.exports = {
  options: {
    config: cc({
      types: versionRc.types,
    }),
    releaseCount: 1,
    outputUnreleased: true,
  },
};
