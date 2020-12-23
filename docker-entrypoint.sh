#!/usr/bin/env sh
set -e
set -- node "./dist/" "$@"
exec "$@"