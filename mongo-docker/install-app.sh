#!/bin/sh

apk --update add make g++ python git

# Install app deps
cd /usr/local/app
npm install

# Clean
apk del make g++ git python
rm -rf /var/cache/apk/*
