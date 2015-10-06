#!/bin/bash

# Start mongo
/tmp/entrypoint.sh mongod&

sleep 5

# Load data
node /usr/local/app/data/reload_mongo.js
