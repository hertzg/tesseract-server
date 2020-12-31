const {
  formatImageName,
  createBuildImageFormatter,
  escapeImageTag,
} = require('./utils');
const { parseRef } = require('../../commons/git-ref');
const { getTags } = require('../../commons/tags');
const {
  getInput,
  getInputLines,
  setOutputs,
  writeInfo,
} = require('../../commons/io');
const { ghaMatrix } = require('../../commons/github');

const parseRepository = repo => {
  const split = repo.split('/');
  const [imageMaybeWithTag, group, ...rest] = split.reverse();
  const [image, maybeTag] = imageMaybeWithTag.split(':');
  const registry = rest.reverse().join('/');
  return {
    repo,
    registry: registry || undefined,
    group: group || undefined,
    image,
    tag: maybeTag || undefined,
  };
};

const stringifyRepository = ({ registry, group, image, tag }) =>
  [
    ...(registry ? [registry] : []),
    ...(group ? [group] : []),
    [image, ...(tag ? [tag] : [])].join(':'),
  ].join('/');

const createImageCombinations = (repos, tags) =>
  repos.flatMap(repo =>
    tags.map(tag => ({
      ...parseRepository(formatImageName({ repo, tag })),
    })),
  );

const createImageInfo = (
  gitRef,
  repositories,
  platforms,
  { branchManifestPrefix },
) => {
  const [firstRepo] = repositories;
  return {
    build: {
      as: parseRepository(firstRepo).image,
      platforms,
    },
    publishAs: createImageCombinations(
      repositories,
      getTags(parseRef(gitRef), branchManifestPrefix),
    ),
  };
};

const createMatrixBuilder = ({ buildTagPrefix }) => {
  const buildImage = createBuildImageFormatter(buildTagPrefix);

  const createBuildMatrices = ({ build, publishAs }, sha) => {
    return build.platforms.map(platform => {
      return {
        name: `docker-${escapeImageTag(platform)}`,
        platform,
        tag: buildImage.name(build.as, sha, platform),
        push: [
          ...new Set(
            publishAs.map(repo =>
              stringifyRepository({
                ...repo,
                tag: buildImage.tag(sha, platform),
              }),
            ),
          ),
        ],
      };
    });
  };

  const createManifestMatrices = (builds, publishAs) =>
    publishAs.map(repo => {
      return {
        name: `docker-push (${repo.tag}, ${repo.image}, ${repo.group}, ${repo.registry})`,
        repo,
        multiarch: {
          tag: repo.repo,
          images: builds.map(build =>
            stringifyRepository({
              ...repo,
              tag: parseRepository(build.tag).tag,
            }),
          ),
        },
      };
    });

  return {
    builds: createBuildMatrices,
    manifests: createManifestMatrices,
  };
};

const BRANCH_PREFIX = 'branch-';
const BUILD_TAG_PREFIX = 'git-';

const gitRef = getInput('git-ref');
const gitSha = getInput('git-sha');
const repositories = getInputLines('repositories');
const platforms = getInputLines('platforms');

const matrixBuilder = createMatrixBuilder({
  buildTagPrefix: BUILD_TAG_PREFIX,
});

const imagesInfo = createImageInfo(gitRef, repositories, platforms, {
  branchManifestPrefix: BRANCH_PREFIX,
});
const builds = matrixBuilder.builds(imagesInfo, gitSha);
const manifests = matrixBuilder.manifests(builds, imagesInfo.publishAs);

const outputs = {
  builds: ghaMatrix(builds),
  manifests: ghaMatrix(manifests),
};

writeInfo(JSON.stringify({ imagesInfo, ...outputs }, null, 2));
setOutputs(outputs);
