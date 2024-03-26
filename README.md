# Tesseract server (OCR over HTTP)

A small lightweight HTTP server that converts photos, images and scanned
documents to text using optical character recognition by utilizing the power of
[Google Tesseract](https://github.com/tesseract-ocr/tesseract).

![An arrow from papers to json signifying conversion, arrow is labeled as http](feature-image.png)

## Quick Start

The easiest way to get started is using
[pre-built docker images](https://hub.docker.com/repository/docker/hertzg/tesseract-server)
(multi-arch)

```shell script
docker run -p 8884:8884 hertzg/tesseract-server:latest
```

You can use the service by sending `multipart` http requests containing
`options` and `file` fields.

<!-- prettier-ignore-start -->
```shell script
# Run OCR using english language on file sample.jpg in current directory
curl -F "options={\"languages\":[\"eng\"]}" -F file=@sample.jpg http://127.0.0.1:8884/tesseract

{
  "data": {
    "exit": {
      "code": 0,
      "signal": null
    },
    "stderr": "Warning: Invalid resolution 0 dpi. Using 70 instead.\nEstimating resolution as 153\n",
    "stdout": " \n\n \n\nThe Life and Work of\nFredson Bowers\n\nby\nG. THOMAS TANSELLE\n\n \n\nN EVERY FIELD OF ENDEAVOR THERE ARE A FEW FIGURES WHOSE AGCOM-\nplishment and influence cause them to be the symbols of their age;\ntheir careers and oeuvres become the touchstones by which the\nfield is measured and its history told. In the related pursuits of\n\nanalytical and descriptive bibliography, textual criticism, and scholarly\nediting, Fredson Bowers was such a figure, dominating the four decades\nafter 1949, when his Principles of Bibliographical Description was pub-\nlished. By 1973 the period was already being called “the age of Bowers”:\nin that year Norman Sanders, writing the chapter on textual scholarship\nfor Stanley Wells's Shakespeare: Select Bibliographies, gave this title to\na section of his essay. For most people, it would be achievement enough\nto ise to such a position in a field as complex as Shakespearean textual\nstudies; but Bowers played an equally important role in other areas.\nEditors of nineteenth-century American authors, for example, would\nalso have to call the recent past “the age of Bowers, as would the writers\nof descriptive bibliographics of authors and presses. His ubiquity in\nthe broad field of bibliographical and textual study, his seemingly com-\nplete possession of it, distinguished him from his illustrious predeces-\nsors and made him the personification of bibliographical scholarship in\nhis time.\n\nWhen in 1969 Bowers was awarded the Gold Medal of the Biblio-\ngraphical Society in London, John Carter’s citation referred to the\nPrinciples as “majestic,” called Bowers’s current projects “formidable,”\nsaid that he had “imposed critical discipline” on the texts of several\nauthors, described Studies in Bibliography as a “great and continuing\nachievement,” and included among his characteristics “uncompromising\nseriousness of purpose” and “professional intensity.” Bowers was not\nunaccustomed to such encomia, but he had also experienced his share of\nattacks: his scholarly positions were not universally popular, and he\nexpressed them with an aggressiveness that almost seemed calculated to\n\n \n\f"
  }
}
```
<!-- prettier-ignore-end -->

## Usage

The service provides configurations as cli options. All the options with their
descriptions, types and defaults including some usage examples can be seen using
`--help` flag.

<!-- prettier-ignore-start -->
```shell script
# Using Docker
$ docker hertzg/tesseract-server:latest --help
```
```text test-id="--help" test-param-columns="160"
tesseract-server [options]

A small lightweight http server exposing tesseract as a service.

Options:
  --help                                    Show help                                                                                                  [boolean]
  --version                                 Show version number                                                                                        [boolean]
  --pool.default.min                        Minimum number of processes to keep waiting in each pool                                       [number] [default: 0]
  --pool.default.max                        Maximum number of processes to spawn for each pool after which requests are queued             [number] [default: 2]
  --pool.default.idleTimeoutMillis          Time (in milliseconds) a processes can stay idle in queue before eviction                   [number] [default: 5000]
  --pool.default.evictionRunIntervalMillis  Time interval (in milliseconds) between eviction checks                                     [number] [default: 5000]
  --http.listen.address                     Set http listen address                                                                [string] [default: "0.0.0.0"]
  --http.listen.port                        Set http listen port                                                                        [number] [default: 8884]
  --http.upload.tmpDir                      Path to where temp uploads are saved to                                                   [string] [default: "/tmp"]
  --http.endpoint.status.enable             Enable /status endpoint                                                                    [boolean] [default: true]
  --http.endpoint.health.enable             Enable /.well-known/health/* endpoints and health checkers                                 [boolean] [default: true]
  --http.endpoint.webui.enable              Enable Web UI at /                                                                         [boolean] [default: true]
  --http.input.optionsField                 Multipart field name containing OCR Options                                            [string] [default: "options"]
  --http.input.fileField                    Multipart field name containing OCR file                                                  [string] [default: "file"]
  --http.output.jsonSpaces                  Enable json pretty printing and set number of spaces to use for indentation                    [number] [default: 0]
  --processor.lineEndings                   Set line ending policy                                    [string] [choices: "auto", "lf", "crlf"] [default: "auto"]

Examples:
  tesseract-server --http.output.jsonSpaces 2                                       Enable JSON pretty printing
  tesseract-server --http.endpoint.status.enable false                              Disable Status and Health endpoints
  --http.endpoint.health.enable false

References:
  GitHub: https://github.com/hertzg/tesseract-server
  Discussions: https://github.com/hertzg/tesseract-server/discussions
  Issues: https://github.com/hertzg/tesseract-server/issues
```
<!-- prettier-ignore-end -->

## Docker

Docker images are multi-arch images based on `alpine` variant of official `node`
docker images supporting `linux/amd64`, `linux/arm/v6`, `linux/arm/v7`,
`linux/arm64/v8`, `linux/ppc64le` and `linux/s390x` platforms.

## Raspberry Pi support

The docker images support ARM architectures which means that they can be used on
at least the following versions of Raspberry Pi:

- RPi 1 Model A
- RPi 1 Model A+
- RPi 3 Model A+
- RPi 1 Model B
- RPi 1 Model B+
- RPi 2 Model B
- RPi 2 Model B v1.2 (:heavy_check_mark: tested)
- RPi 3 Model B
- RPi 3 Model B+ (:heavy_check_mark: tested)
- RPi 4 Model B (:heavy_check_mark: tested)
- Compute Module 1
- Compute Module 3
- Compute Module 3 Lite
- Compute Module 3+
- Compute Module 3+ Lite
- RPi Zero PCB v1.2
- RPi Zero PCB v1.3
- RPi Zero W

If you have any of those devices and have successfully used the images feel free
to report them and help update this list. :open_hands:

## Supported Languages

The container by default installs tesseract and 3 datapacks:

- `tesseract-ocr` - English (included)
- `tesseract-ocr-data-deu` - German
- `tesseract-ocr-data-fra` - French
- `tesseract-ocr-data-kat` - Georgia
- `tesseract-ocr-data-pol` - Polish
- `tesseract-ocr-data-rus` - Russian

To add more languages you can extend this image and install one or more
[available language datapacks](https://pkgs.alpinelinux.org/packages?name=tesseract-ocr-data-*&branch=edge&arch=x86_64)
with the package manager:

<!-- prettier-ignore-start -->
```Dockerfile
FROM hertzg/tesseract-server:latest
RUN apk add --no-cache tesseract-ocr-data-spa tesseract-ocr-data-ara # and so on
```
<!-- prettier-ignore-end -->

After starting the container the new language will be automatically available.

## HTTP API

There are a few endpoints exposed this section describes each one.

### OCR Endpoint - `/tesseract`

This endpoint performs OCR on provided `file`, You can control the OCR process
by providing `options` field with `JSON` object containing the configuration.
This is the main endpoint that expects http `multipart` request containing
`options` and `file` fields and returns a `json` containing `stdout` and
`stderr` of the tesseract process.

The `options` json object fields directly relate to the CLI options of
`tesseract` command.

<!-- prettier-ignore-start -->
```json5
{
  "languages": ['eng'],               // -l LANG[+LANG]        Specify language(s) used for OCR.
  "dpi": 300,                         // --dpi VALUE           Specify DPI for input image.
  "pageSegmentationMethod": 3,        // --psm NUM             Specify page segmentation mode.
  "ocrEngineMode": 3,                 // --oem NUM             Specify OCR Engine mode.
  "tessDataDir": './dir',             // --tessdata-dir PATH   Specify the location of tessdata path.,
  "userPatternsFile": './file',       // --user-words PATH     Specify the location of user words file.
  "userWordsFile": './file',          // --user-patterns PATH  Specify the location of user patterns file.
  "configParams": {                   // -c VAR=VALUE          Set value for config variables.
    "VAR": "VALUE",                   // Note: You can use tesseract --print-parameters to see all available parameters
  },
}
```
<!-- prettier-ignore-end -->

The returned response has the following shape

<!-- prettier-ignore-start -->
```json5
{
  "exit": {
    "code": 0,                        // Process exit code
    "signal": null                    // Process signal that caused the exit
  },
  "stderr":  "...",                    // Tesseract Errors and warnings
  "stdout":  "..."                     // Tesseract output that contains the result
}
```
<!-- prettier-ignore-end -->

### Status Endpoint - `/status`

```shell
# Get worker status
$ curl http://127.0.0.1:8884/status
```

Returns the pool and their statuses as JSON. When you make OCR request the first
pool will be created and then re-used. This endpoint also shows detailed
information about each pool including process pids and eviction flags.

<!-- prettier-ignore-start -->
```json5
{
  data: {
    processor: {
      pools: [
        {
          args: '-l eng',
          resources: [],
          status: {
            spareResourceCapacity: 2,
            size: 0,
            available: 0,
            borrowed: 0,
            pending: 0,
            max: 2,
            min: 0,
          },
        },
      ],
    },
  },
}
```
<!-- prettier-ignore-end -->

### Health Endpoints

Endpoints:

- `/.well-known/health/healthy`
- `/.well-known/health/live`
- `/.well-known/health/ready`

The difference between liveness and readiness endpoints is the purpose:
readiness should be used to denote whether an application is "ready" to receive
requests, and liveness should be used to denote whether an application is "live"
(vs. in a state where it should be restarted.

The combined health endpoint is designed for cloud technologies, such as Cloud
Foundry which only support a single endpoint for both liveness and readiness
checking.

## Deployment Guides

- [Heroku](./docs/heroku-deploy.md)
