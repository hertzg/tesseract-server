# Heroku Deploy

Before creating the Heroku project, we must add the `Aptfile` and `Procfile` files.

Fork this project. And add the `Aptfile` and `Procfile` files. 

### Aptfile

```
# https://stackoverflow.com/questions/66087588/tesseract-error-while-loading-shared-libraries-libarchive-so-13-python
*libarchive13*
# tesseract dependencies
tesseract-ocr
tesseract-ocr-deu
tesseract-ocr-fra
tesseract-ocr-kat
tesseract-ocr-pol
tesseract-ocr-rus
# tesseract-ocr-all
```

### Procfile

```
web: yarn run build && yarn run run
```

# Create Heroku Project

```shell
$ heroku create <heroku-app-name>
$ heroku stack:set heroku-20
# For Aptfile
$ heroku buildpacks:add --index 1 heroku-community/apt
$ heroku buildpacks:add heroku/nodejs
$ heroku config:set TESSDATA_PREFIX=/app/.apt/usr/share/tesseract-ocr/4.00/tessdata
$ heroku config:set NODE_OPTIONS=--max-old-space-size=8192
$ heroku buildpacks
=== <heroku-app-name> Buildpack URLs
1. heroku-community/apt
2. heroku/nodejs
$ git push heroku main
$ heroku open
```

or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
