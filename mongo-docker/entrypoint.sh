#!/bin/bash

set -e

if [ "${1:0:1}" = '-' ]; then
    set -- mongod "$@"
fi

if [ "$1" = 'mongod' ]; then
    chown -R mongodb:mongodb /data/db

    exec gosu mongodb "$@"
fi

exec "$@"
