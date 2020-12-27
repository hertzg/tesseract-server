const { getRefType } = require('../../commons/helpers');
const { parseRef } = require('../../commons/git-ref');
const { getTags } = require('../../commons/tags');
const {
  getInput,
  getInputLines,
  setOutput,
  writeInfo,
} = require('../../commons/io');
const { ghaMatrix } = require('../../commons/github');

const BRANCH_PREFIX = 'branch-';

const gitRef = getInput('git-ref');
const repositories = getInputLines('repositories');
const platforms = getInputLines('platforms');
const publishOn = getInputLines('publish-on');

const parsedRef = parseRef(gitRef);

const tags = getTags(parsedRef, BRANCH_PREFIX);
const [version] = tags;

const asArch = s => s.split('/').slice(1).join('-');
const asImageString = ([repository, tag]) => `${repository}:${tag}`;

const escapeString = s => s.replace(/[^0-9a-z-._]+/gi, '-');
const withPlatform = (image, platform) => `${image}-${escapeString(platform)}`;

const images = repositories.flatMap(repository =>
  tags.map(tag => [repository, tag]),
);

const config = {
  shouldPublish: publishOn.includes(getRefType(parsedRef)),
};

const builds = platforms
  .map(platform => ({
    id: escapeString(asArch(platform)),
    save: {
      tag: withPlatform(asImageString([repositories[0], version]), platform),
      file: escapeString(withPlatform(version, platform)),
    },
    tags: images.map(image => withPlatform(asImageString(image), platform)),
  }))
  .map(config => ({
    name: `docker-build-${config.id}`,
    ...config,
  }));

const manifests = images
  .map(image => ({
    tag: asImageString(image),
    image,
    images: platforms.map(platform =>
      withPlatform(asImageString(image), platform),
    ),
  }))
  .map(config => ({
    name: `docker-manifest (${config.image.reverse().join(', ')})`,
    ...config,
  }));

writeInfo(
  JSON.stringify(
    {
      config: config,
      builds: ghaMatrix(builds),
      manifests: ghaMatrix(manifests),
    },
    null,
    2,
  ),
);

setOutput('config', JSON.stringify(config));
setOutput('builds', JSON.stringify(ghaMatrix(builds)));
setOutput('manifests', JSON.stringify(ghaMatrix(manifests)));
