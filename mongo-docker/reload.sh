#!/bin/bash

# Wait for mongod to start
sleep 10

node /usr/local/app/data/reload_mongo.js
