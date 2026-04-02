#!/bin/sh
set -e

if [ -n "$TESSERACT_SERVER_INSTALL_LANGUAGES" ]; then
  pkgs=""
  for lang in $(echo "$TESSERACT_SERVER_INSTALL_LANGUAGES" | tr ',' ' '); do
    pkgs="$pkgs tesseract-ocr-data-$lang"
  done
  echo "Installing additional language packs:$pkgs"
  apk add --no-cache $pkgs
fi

exec "$@"
