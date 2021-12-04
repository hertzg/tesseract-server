#!/usr/bin/env sh
set -e
set -- yarn run run "$@"
exec "$@"
