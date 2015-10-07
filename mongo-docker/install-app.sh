#!/bin/bash

apk --update add make g++ python git

# Install app deps
cd /usr/local/app
npm install

# Start mongo
mongod --smallfiles&

/tmp/reload.sh
kill %%

# Clean
apk del make g++ git python
rm -rf /var/cache/apk/*
