const escapeImageTag = s => s.replace(/[^0-9a-z\-._]+/gi, '-');

const formatImageName = ({ repo, tag }) => `${repo}:${tag}`;

const createBuildImageFormatter = prefix => {
  const formatBuildImageName = (repo, sha, platform) =>
    formatImageName({ repo, tag: formatBuildImageTag(sha, platform) });

  const formatBuildImageTag = (sha, platform) =>
    `${prefix}${sha}-${escapeImageTag(platform)}`;

  return {
    name: formatBuildImageName,
    tag: formatBuildImageTag,
  };
};

module.exports = {
  createBuildImageFormatter,
  formatImageName,
  escapeImageTag,
};
