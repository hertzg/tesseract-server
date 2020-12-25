## [Unreleased](https://github.com/hertzg/tesseract-server/compare/v1.2.0...fa9f9f55e581956cd01e3fb0f49e12ee06b90220) (2020-12-25)


### 🐛 Bug Fixes

* entrypoint and introduce tini ([f9c0fe9](https://github.com/hertzg/tesseract-server/commit/f9c0fe9b83665d2a2c114460ed43b61ec8e7aeaf))


### 🧪 Testing Improvements

* **goss:** test tini and docker-entrypoint in container ([ee634e2](https://github.com/hertzg/tesseract-server/commit/ee634e2052e94c9d37f8cc2b4d93e570ebc55fcb))


### 📖 Documentation Updates

* update overview to be more friendlier ([009510c](https://github.com/hertzg/tesseract-server/commit/009510c5860c646b9bf63a86c47945ff17a35536))
* **changelog:** Introduce CHANGELOG-next.md for unreleased changes ([f846009](https://github.com/hertzg/tesseract-server/commit/f8460099fc2f855a0dd0f3a52a65fdac909f5a61))
* **readme.md:** add docker, raspberry pi and language addition instructions ([e493e37](https://github.com/hertzg/tesseract-server/commit/e493e37fa479cfd294bc34e4fd6805eb263b58f9))
* **readme.md:** add links and wrapping to docs ([2697298](https://github.com/hertzg/tesseract-server/commit/2697298e90f0ab34c53f8fc7b84a195e8b2e376e))
* **readme.md:** add usage docs with cli flags ([94b4ffc](https://github.com/hertzg/tesseract-server/commit/94b4ffca96a8a1dbf1a08340e71818b3ce36348c))


### 🚆 Pipeline Improvements

* **goss:** bump to v0.3.16 from default v0.3.6 ([874f86e](https://github.com/hertzg/tesseract-server/commit/874f86ec19ae6ee9de5d1bbdbaf8468bda3a7d93))
* **goss:** fix goss failures on github actions ([#8](https://github.com/hertzg/tesseract-server/issues/8)) ([6169dc9](https://github.com/hertzg/tesseract-server/commit/6169dc96a400228a55c85b9157757157957d683a))
* **pipeline:** only trigger on relevant file changes ([58bfc74](https://github.com/hertzg/tesseract-server/commit/58bfc7454714ce48be5117b5a9e54f4949a97fee))


### 🛠️ General Chores

* **changelog:** generate CHANGELOG-next.md ([2d8b37a](https://github.com/hertzg/tesseract-server/commit/2d8b37aa92cda038e76fa4096481f40726cc055c))
* **changelog:** generate CHANGELOG-next.md ([a76d1b8](https://github.com/hertzg/tesseract-server/commit/a76d1b8d1a92891078a62956de2eebea9c0f875d))
* **linguist:** Ignore supporting files & scripts from language statistics ([099cb58](https://github.com/hertzg/tesseract-server/commit/099cb580d977d54117b1aeaf50995fe81e402f33))
* **readme:** fix typo ([40d93b3](https://github.com/hertzg/tesseract-server/commit/40d93b39aa467fe7d9213cd129113be459d49e0c))
* drop hazardous release:* run commands ([a97699a](https://github.com/hertzg/tesseract-server/commit/a97699ae3fbf727a93f69c55b466bf5ade1510b1))
* **prettier:** always wrap proses (markdown texts) at 80 chars ([0f99abe](https://github.com/hertzg/tesseract-server/commit/0f99abe4ddbf388265a2cd07518968c87d073230))


### 🚀 Features

* **docker:** multi-target dockerfile & workflow speedups ([#9](https://github.com/hertzg/tesseract-server/issues/9)) ([7a989eb](https://github.com/hertzg/tesseract-server/commit/7a989eb37be7fb9436a1a3a29f44209a65cb7359))
* **http:** validate user input (`options`) ([#14](https://github.com/hertzg/tesseract-server/issues/14)) ([fa9f9f5](https://github.com/hertzg/tesseract-server/commit/fa9f9f55e581956cd01e3fb0f49e12ee06b90220))
* document all options and improve `--help` ([08f7094](https://github.com/hertzg/tesseract-server/commit/08f7094eadd24a1601a9241cce6023816c729710))

