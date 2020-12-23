# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
