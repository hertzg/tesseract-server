# Tesseract server

A small lightweight http server exposing tesseract as a service.

## Usage

The easiest way to get started is using pre-build docker images

```shell script
$ docker -p 8884:8884 hertzg/tesseract-server:latest
```

You can use the service by sending `multipart` http requests containing `options` and `file` fields.

```shell script
# Run OCR using english language on file sample.jpg in current directory
$ curl -F "options={\"languages\":[\"eng\"]}" -F file=@sample.jpg http://127.0.0.1:8884/

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

## HTTP API

There are a few endpoints exposed this section describes each one.

### OCR Endpoint - `/`

This endpoint performs OCR on provided `file`, You can control the OCR process by providing `options` field with `JSON` object containing the configuration.
This is the main endpoint that expects http `multipart` request containing `options` and `file` fields and returns a `json` containing `stdout` and `stderr` of the tesseract process.

The `options` json object fields directly relate to the CLI options of `tesseract` command.

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

The returned response has the following shape

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

### Health Endpoints

Endpoints:

- `/.well-known/health/healthy`
- `/.well-known/health/live`
- `/.well-known/health/ready`

The difference between liveness and readiness endpoints is the purpose: readiness should be used to denote whether an application is "ready" to receive requests, and liveness should be used to denote whether an application is "live" (vs. in a state where it should be restarted.

The combined health endpoint is designed for cloud technologies, such as Cloud Foundry which only support a single endpoint for both liveness and readiness checking.
