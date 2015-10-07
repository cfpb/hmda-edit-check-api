#!/bin/bash

# Wait for mongod to start
sleep 5

node /usr/local/app/data/reload_mongo.js
