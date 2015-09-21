#!/bin/bash
set -e

if [ "${1:0:1}" = '-' ]; then
    set -- node "$@"
fi

if [ "$1" = 'node' ]; then
    chown -R nodejs:nodejs /usr/local/node/hmda-edit-check-api
    exec gosu nodejs "$@"
fi

exec "$@"