#!/bin/sh

##### add dependencies
apk --update add git make g++ python

##### do npm install on the app so it has all the proper modules
cd /usr/local/node/hmda-edit-check-api
npm cache clean && npm install

##### add a non-root user
adduser -S notroot
chown -R notroot .


##### clean up
apk del git make gcc g++ python 
rm -rf /etc/ssl /usr/include /usr/share/man /tmp/* \
    /usr/include /root/.npm /root/.node-gyp \
    /usr/local/node/.npm /usr/local/node/.node-gyp \
    /usr/lib/node_modules/npm/man /usr/lib/node_modules/npm/doc \
    /usr/lib/node_modules/npm/html /var/cache/apk/*
