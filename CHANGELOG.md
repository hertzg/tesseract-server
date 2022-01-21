
[//]: # (GENERATED FILE. DO NOT EDIT DIRECTLY. ALL CHANGES WILL BE OVERWRITTEN)

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## Unreleased (pending for next release)

All unreleased changes scheduled for the next release are in [CHANGELOG-next.md](./CHANGELOG-next.md)

## [2.4.0](https://github.com/hertzg/tesseract-server/compare/v2.3.0...v2.4.0) (2022-01-21)


### 🛠️ General Chores

* **deps:** update node docker tag to v16.13.2 ([#40](https://github.com/hertzg/tesseract-server/issues/40)) ([c4f6d60](https://github.com/hertzg/tesseract-server/commit/c4f6d60c8318e3878214bbd68439b6b19277ac3c))


### 🚀 Features

* bump base & include more datapacks ([#41](https://github.com/hertzg/tesseract-server/issues/41)) ([2cfe254](https://github.com/hertzg/tesseract-server/commit/2cfe254cc216cda3a3a283263394591c55bebb8f))

## [2.3.0](https://github.com/hertzg/tesseract-server/compare/v2.2.0...v2.3.0) (2021-12-05)


### 🐛 Bug Fixes

* **http:** empty file returns 400 bad request ([#38](https://github.com/hertzg/tesseract-server/issues/38)) ([a0c2f0a](https://github.com/hertzg/tesseract-server/commit/a0c2f0a99b426be6ae93d32f5fdb332cded097cf))
* **types:** upgrade @types/node to v16 and update types ([#37](https://github.com/hertzg/tesseract-server/issues/37)) ([619cb5c](https://github.com/hertzg/tesseract-server/commit/619cb5cc83d6b95c3b7c44e3eb78007778920ba8))


### 🚀 Features

* **node:** upgrade node to v16 ([#34](https://github.com/hertzg/tesseract-server/issues/34)) ([fb3b7ff](https://github.com/hertzg/tesseract-server/commit/fb3b7ff2a13d74996a042c914625910b898685ff))
* **webui:** simple ui to submit scan ([#39](https://github.com/hertzg/tesseract-server/issues/39)) ([fab7ccb](https://github.com/hertzg/tesseract-server/commit/fab7ccbfe46640a3b81c4ca54e45a54400e1b8c4))
* **yarn:** upgrade to berry ([#35](https://github.com/hertzg/tesseract-server/issues/35)) ([233f8df](https://github.com/hertzg/tesseract-server/commit/233f8dfaa0734b3da8f8445b00ab46a03e00be54))


### 🛠️ General Chores

* **changelog:** update next changelog ([f27be61](https://github.com/hertzg/tesseract-server/commit/f27be612d726b836471d70a619aea5d23c779868))
* **changelog:** update next changelog ([31f53dd](https://github.com/hertzg/tesseract-server/commit/31f53dd1a633279dce855a7b1e43d1cf566fb6a8))
* **changelog:** update next changelog ([6dd5aca](https://github.com/hertzg/tesseract-server/commit/6dd5aca4eeb4fad87a7bfdc6302e29fc89ad40fc))
* **ci:** add pull-request write permissions ([#36](https://github.com/hertzg/tesseract-server/issues/36)) ([81df68a](https://github.com/hertzg/tesseract-server/commit/81df68a88ea511b29a5002a1c70117311f1d2d7e))
* **deps:** update codecov/codecov-action action to v2 ([#24](https://github.com/hertzg/tesseract-server/issues/24)) ([db5c9e1](https://github.com/hertzg/tesseract-server/commit/db5c9e13b9d0d5d44d71ff08f3f93c25d11d647c))
* **deps:** update dependency @typescript-eslint/eslint-plugin to v5 ([#26](https://github.com/hertzg/tesseract-server/issues/26)) ([2b8ba8c](https://github.com/hertzg/tesseract-server/commit/2b8ba8c71dbfe44a70b7f53a3dd98c7410f7bb17))
* **deps:** update dependency bl to v5 ([#28](https://github.com/hertzg/tesseract-server/issues/28)) ([da6e401](https://github.com/hertzg/tesseract-server/commit/da6e40164afb1a112affb25acf7df239a9f93942))
* **deps:** update dependency unified to v10 ([#30](https://github.com/hertzg/tesseract-server/issues/30)) ([439ca80](https://github.com/hertzg/tesseract-server/commit/439ca80d29189526c76eb41f6b84268897e9a6ca))
* **deps:** update e1himself/goss-installation-action action to v1.0.4 ([#23](https://github.com/hertzg/tesseract-server/issues/23)) ([847eaeb](https://github.com/hertzg/tesseract-server/commit/847eaeb591c006451046a0fcdccb99e29f04b0ec))
* add renovate ([ccd40fc](https://github.com/hertzg/tesseract-server/commit/ccd40fc2782b3f45e710923d71919a621031c9fc))

## [2.2.0](https://github.com/hertzg/tesseract-server/compare/v2.1.0...v2.2.0) (2021-12-04)


### 🛠️ General Chores

* **changelog:** clear CHANGELOG-next.md ([6131ebc](https://github.com/hertzg/tesseract-server/commit/6131ebcf42433b403dfd1fb6f78c35737fd7890d))
* **ci:** fix permissions ([fef489a](https://github.com/hertzg/tesseract-server/commit/fef489a7c703e5af189df2b9dc8c0b98b6159800))


### 🚀 Features

* **docker:** pin version to 14.18.2-alpine3.14 ([ce4316d](https://github.com/hertzg/tesseract-server/commit/ce4316db09e39bb725aa94e2f25160ccc233513c))
* **tesseract:** update tesseract-ocr* to 4.1.1-r5 ([b8f7c67](https://github.com/hertzg/tesseract-server/commit/b8f7c6747de2458c5903ac216124b87144152db7))
* include version in status ([b0fa3a9](https://github.com/hertzg/tesseract-server/commit/b0fa3a9d6042cf5c9d4cea87a621db1fbed79bf1))


### 🐛 Bug Fixes

* **ghcr:** fix build & push permissions ([fe1d8ea](https://github.com/hertzg/tesseract-server/commit/fe1d8ea48a199b09ec330000ef31946e991fa710))
* **ghcr:** fix multi-arch push permissions ([b7a2aa5](https://github.com/hertzg/tesseract-server/commit/b7a2aa5def3118c77b5d004ff3051f1bc993e250))

## [2.1.0](https://github.com/hertzg/tesseract-server/compare/v2.0.0...v2.1.0) (2021-07-07)


### 📖 Documentation Updates

* update readme mentioning new platforms ([c408712](https://github.com/hertzg/tesseract-server/commit/c408712f3e28b9117763df4818d7497ca7543968))


### 🚆 Pipeline Improvements

* migrate to ubuntu-20.04 as runner virtualenv ([#20](https://github.com/hertzg/tesseract-server/issues/20)) ([c75ff9d](https://github.com/hertzg/tesseract-server/commit/c75ff9dcc8c7e32835a65f30c411da181769dd7b))


### 🛠️ General Chores

* drop useless test ([#21](https://github.com/hertzg/tesseract-server/issues/21)) ([a6f3c7c](https://github.com/hertzg/tesseract-server/commit/a6f3c7cc70c2a9cb5208d55feb26faead2ce0f65))
* **changelog:** generate CHANGELOG-next.md ([d73932c](https://github.com/hertzg/tesseract-server/commit/d73932c805455ed99cd2b0def986630caed190ed))


### 🐛 Bug Fixes

* **logging:** remove useless logging ([05686bf](https://github.com/hertzg/tesseract-server/commit/05686bf553ff1a05992029cc21df1f1da511f194))


### 🚀 Features

* **logging:** log listening address on startup ([3440fda](https://github.com/hertzg/tesseract-server/commit/3440fda142fe27f939a2490f3a78218347bd894e))
* **status:** include host info ([a02f34a](https://github.com/hertzg/tesseract-server/commit/a02f34aed992c491a349a1978d8e94467b1aaf40))
* **status:** include host info ([67ce2de](https://github.com/hertzg/tesseract-server/commit/67ce2de951f21b14778b6400f51898a43bb5ccab))
* introduce ppc64 and s390x platform support in docker ([#19](https://github.com/hertzg/tesseract-server/issues/19)) ([56407c8](https://github.com/hertzg/tesseract-server/commit/56407c8fe16b03923e75c36b0ad8097f838071e7))

## [2.0.0](https://github.com/hertzg/tesseract-server/compare/v1.2.0...v2.0.0) (2021-01-03)


### ⚠ BREAKING CHANGES

* **http:** rename `/` as `/tesseract`
* **node:** target latest lts (node v14.x) only (#15)

### 🐛 Bug Fixes

* entrypoint and introduce tini ([f9c0fe9](https://github.com/hertzg/tesseract-server/commit/f9c0fe9b83665d2a2c114460ed43b61ec8e7aeaf))


### 📖 Documentation Updates

* update overview to be more friendlier ([009510c](https://github.com/hertzg/tesseract-server/commit/009510c5860c646b9bf63a86c47945ff17a35536))
* **changelog:** Introduce CHANGELOG-next.md for unreleased changes ([f846009](https://github.com/hertzg/tesseract-server/commit/f8460099fc2f855a0dd0f3a52a65fdac909f5a61))
* **readme.md:** add docker, raspberry pi and language addition instructions ([e493e37](https://github.com/hertzg/tesseract-server/commit/e493e37fa479cfd294bc34e4fd6805eb263b58f9))
* **readme.md:** add links and wrapping to docs ([2697298](https://github.com/hertzg/tesseract-server/commit/2697298e90f0ab34c53f8fc7b84a195e8b2e376e))
* **readme.md:** add usage docs with cli flags ([94b4ffc](https://github.com/hertzg/tesseract-server/commit/94b4ffca96a8a1dbf1a08340e71818b3ce36348c))


### 🧪 Testing Improvements

* **goss:** test tini and docker-entrypoint in container ([ee634e2](https://github.com/hertzg/tesseract-server/commit/ee634e2052e94c9d37f8cc2b4d93e570ebc55fcb))
* **lockfile:** check for resolved url correctness ([68a5561](https://github.com/hertzg/tesseract-server/commit/68a55616e4985059af1d1adf1107b3fe186744b5))
* **readme:** test code blocks from readme ([43afc0c](https://github.com/hertzg/tesseract-server/commit/43afc0ca6a98d4a2fd26918bb2fa72b26cce6567))


### 🚆 Pipeline Improvements

* drop old action & interactive docker builds ([#17](https://github.com/hertzg/tesseract-server/issues/17)) ([f842b53](https://github.com/hertzg/tesseract-server/commit/f842b5310c21265ed7235b0098c02f4be7aab2f7))
* **docker:** build images in parallel ([#16](https://github.com/hertzg/tesseract-server/issues/16)) ([c021cdc](https://github.com/hertzg/tesseract-server/commit/c021cdc4a91f30c25fbf82442ebab37292a13e32))
* **goss:** bump to v0.3.16 from default v0.3.6 ([874f86e](https://github.com/hertzg/tesseract-server/commit/874f86ec19ae6ee9de5d1bbdbaf8468bda3a7d93))
* **goss:** fix goss failures on github actions ([#8](https://github.com/hertzg/tesseract-server/issues/8)) ([6169dc9](https://github.com/hertzg/tesseract-server/commit/6169dc96a400228a55c85b9157757157957d683a))
* **pipeline:** only trigger on relevant file changes ([58bfc74](https://github.com/hertzg/tesseract-server/commit/58bfc7454714ce48be5117b5a9e54f4949a97fee))


### 🛠️ General Chores

* update linguist gitattributes ([525b6cd](https://github.com/hertzg/tesseract-server/commit/525b6cdc2db5f08ccdd7783ff6f6fad6d847baa0))
* **changelog:** generate CHANGELOG-next.md ([9729600](https://github.com/hertzg/tesseract-server/commit/97296005f8b519cc5dabe07c203984e250334d51))
* **changelog:** generate CHANGELOG-next.md ([2d8b37a](https://github.com/hertzg/tesseract-server/commit/2d8b37aa92cda038e76fa4096481f40726cc055c))
* **changelog:** generate CHANGELOG-next.md ([a76d1b8](https://github.com/hertzg/tesseract-server/commit/a76d1b8d1a92891078a62956de2eebea9c0f875d))
* **linguist:** Ignore supporting files & scripts from language statistics ([099cb58](https://github.com/hertzg/tesseract-server/commit/099cb580d977d54117b1aeaf50995fe81e402f33))
* **prettier:** always wrap proses (markdown texts) at 80 chars ([0f99abe](https://github.com/hertzg/tesseract-server/commit/0f99abe4ddbf388265a2cd07518968c87d073230))
* **readme:** fix typo ([40d93b3](https://github.com/hertzg/tesseract-server/commit/40d93b39aa467fe7d9213cd129113be459d49e0c))
* **readme:** generate CHANGELOG-next.md ([a6c733b](https://github.com/hertzg/tesseract-server/commit/a6c733b6f2e83b423f967bb5caa5b061e82860d4))
* **tools:** avoid arrowParens with prettier ([8fecc4d](https://github.com/hertzg/tesseract-server/commit/8fecc4d9f972a296571e8b3c3833dda30a7e3cd3))
* **tools:** format readme and add full-test command ([1b8215b](https://github.com/hertzg/tesseract-server/commit/1b8215b21dac9ee466781b386628c6aa6c5f94b5))
* drop hazardous release:* run commands ([a97699a](https://github.com/hertzg/tesseract-server/commit/a97699ae3fbf727a93f69c55b466bf5ade1510b1))


### 🚀 Features

* **docker:** multi-target dockerfile & workflow speedups ([#9](https://github.com/hertzg/tesseract-server/issues/9)) ([7a989eb](https://github.com/hertzg/tesseract-server/commit/7a989eb37be7fb9436a1a3a29f44209a65cb7359))
* **http:** rename `/` as `/tesseract` ([de55908](https://github.com/hertzg/tesseract-server/commit/de55908cc0cb14548b81935f83a9967660b3c3a8))
* **http:** validate user input (`options`) ([#14](https://github.com/hertzg/tesseract-server/issues/14)) ([fa9f9f5](https://github.com/hertzg/tesseract-server/commit/fa9f9f55e581956cd01e3fb0f49e12ee06b90220))
* **node:** target latest lts (node v14.x) only ([#15](https://github.com/hertzg/tesseract-server/issues/15)) ([54fcaac](https://github.com/hertzg/tesseract-server/commit/54fcaac6e09118c7d01bdd8a5e5384a8d0dea78a))
* **processor:** ensure line endings are consistent between operating systems ([#18](https://github.com/hertzg/tesseract-server/issues/18)) ([e209115](https://github.com/hertzg/tesseract-server/commit/e2091152a9149256e7bdc0b03e9c095c67fcbaba))
* document all options and improve `--help` ([08f7094](https://github.com/hertzg/tesseract-server/commit/08f7094eadd24a1601a9241cce6023816c729710))

## [1.2.0](https://github.com/hertzg/tesseract-server/compare/v1.1.4...v1.2.0) (2020-12-20)


### 🚀 Features

* introduce health check endpoints ([#5](https://github.com/hertzg/tesseract-server/issues/5)) ([88db003](https://github.com/hertzg/tesseract-server/commit/88db00346eba0c269b77cf57536b9d3be77845d4))


### 🚆 Pipeline Improvements

* introduce standard-version as a release tool ([6cce1a7](https://github.com/hertzg/tesseract-server/commit/6cce1a78c7296b4a69652a1bd386091250f50533))
* trigger on all branches ([#6](https://github.com/hertzg/tesseract-server/issues/6)) ([6ebf08f](https://github.com/hertzg/tesseract-server/commit/6ebf08ff7428ea56c00b199191cc44af3b828433))


### 🛠️ General Chores

* update lockfile ([c8b8c4b](https://github.com/hertzg/tesseract-server/commit/c8b8c4b2c92c379fd923cf85b85e4d3da94bf491))


### 📖 Documentation Updates

* document `/status` entrypoint ([d9711db](https://github.com/hertzg/tesseract-server/commit/d9711db39280fa5f3448566188e97bacdfd86c3c))

## [1.1.4](https://github.com/hertzg/tesseract-server/compare/v1.1.3...v1.1.4) (2020-12-19)


### ci

* enable pushing built images ([6aa446e](https://github.com/hertzg/tesseract-server/commit/6aa446ed277a187b94486fc6830d169217e29918))

### test

* introduce dgoss tests & github actions (#3) ([9d7542e](https://github.com/hertzg/tesseract-server/commit/9d7542e92f1889fdd9909e1f50cd4cb10d2f109d)), closes [#3](https://github.com/hertzg/tesseract-server/issues/3)



## [1.1.3](https://github.com/hertzg/tesseract-server/compare/v1.1.2...v1.1.3) (2020-12-18)


### docs

* prettify output json ([c2b07ca](https://github.com/hertzg/tesseract-server/commit/c2b07ca5baf0e633f4c575ce3e5ebc30547f3789))

### feat

* expose 8884 in Dockerfile ([2d90822](https://github.com/hertzg/tesseract-server/commit/2d90822190c1b74d49f8b351a5d416d530495e1f))

### fix

* start with node ([10cd54a](https://github.com/hertzg/tesseract-server/commit/10cd54ad6be3364724c273208535c3daccbba67b))



## [1.1.2](https://github.com/hertzg/tesseract-server/compare/v1.1.1...v1.1.2) (2020-12-08)


### doc

* the usage and api endpoint documentation ([76a877c](https://github.com/hertzg/tesseract-server/commit/76a877c4a170166f19f9e6c259c0cedaf6ef4d53))

### fix

* disable fancy argument parsing ([13f098d](https://github.com/hertzg/tesseract-server/commit/13f098dd616b7c3ae33a0d5137b5db454df90f4c))



## [1.1.1](https://github.com/hertzg/tesseract-server/compare/v1.1.0...v1.1.1) (2020-12-08)


### fix

* drop power pc and ibm z support as images fail to build ([bd9b643](https://github.com/hertzg/tesseract-server/commit/bd9b643e1d4d98bff63549a60528aa4f6283d976))



# [1.1.0](https://github.com/hertzg/tesseract-server/compare/v1.0.1...v1.1.0) (2020-12-08)


### feat

* include powerpc and s390x variants in docker images ([12c4a95](https://github.com/hertzg/tesseract-server/commit/12c4a95317f9920a02ded51ffd9400cac808e2e5))



## [1.0.1](https://github.com/hertzg/tesseract-server/compare/v1.0.0...v1.0.1) (2020-12-08)


### feat

* include ARM family in docker images arm/v6,arm/v7,arm64/v8 ([793d66a](https://github.com/hertzg/tesseract-server/commit/793d66a0db94a58f1cf38373f4b56f7a39fc2e6e))



# [1.0.0](https://github.com/hertzg/tesseract-server/compare/e022e75c8370656b385e54cc368eb7d33a2fe109...v1.0.0) (2020-12-08)


### chore

* drop husky ([3322f28](https://github.com/hertzg/tesseract-server/commit/3322f2808f74f97377105feff6d7a9d854b3ce5c))

### ci

* build only on amd64 for now ([d92c472](https://github.com/hertzg/tesseract-server/commit/d92c472abc8bc98bd9720be51d50fe492efdacc9))
* drop linux/386 platform ([8b10f58](https://github.com/hertzg/tesseract-server/commit/8b10f586b575b92e8aab7ab53c3894701f68d2e8))
* drop old github container repository ([bd9d184](https://github.com/hertzg/tesseract-server/commit/bd9d18403794669e95d2ab2043026ee2c13da54d))
* fix docker builds ([9c695c1](https://github.com/hertzg/tesseract-server/commit/9c695c1036b473498803eca3259273c7eafeb272))
* specify registry ([928592e](https://github.com/hertzg/tesseract-server/commit/928592edd3c8fe479b613ffc7afcc58868baa8d9))
* tweaks (#1) ([8553650](https://github.com/hertzg/tesseract-server/commit/8553650cf12a50076a134c0758255c416cf001ad)), closes [#1](https://github.com/hertzg/tesseract-server/issues/1)
* user from secrets ([80f6b1e](https://github.com/hertzg/tesseract-server/commit/80f6b1e455c28876de724f8a4f8397117c93df43))

### doc

* extra examples ([4694267](https://github.com/hertzg/tesseract-server/commit/4694267d311320edbb97b1108ca2bfc1529b0d51))

### feat

* docker images ([4bf4838](https://github.com/hertzg/tesseract-server/commit/4bf48384a029649772650beb95c1eb3f53feef54))
* initial version ([e022e75](https://github.com/hertzg/tesseract-server/commit/e022e75c8370656b385e54cc368eb7d33a2fe109))
* status page, pretty json & extra configs ([01fcbac](https://github.com/hertzg/tesseract-server/commit/01fcbac2ae4494c2f8f512c8fc9bf0612a1cdaca))

### fix

* sort config args to allow pool reuse ([e5f8356](https://github.com/hertzg/tesseract-server/commit/e5f83561c4cd3b8c5078d880e91b0fc0f1ac4334))
