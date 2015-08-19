#!/bin/sh

##### add dependencies
apk --update add bash git curl make gcc g++ python linux-headers paxctl libgcc libstdc++
# We need shadow to create user/group for node, requires testing repo at this time
apk add shadow --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/


##### add our nodejs user and group first to make sure their IDs get assigned consistently
groupadd -r nodejs -g 1000
useradd -u 1000 -r -g 1000 -d /usr/local/node nodejs
chown -R nodejs:nodejs /usr/local/node

##### install gosu for easy step-down from root
echo -n "--- installing gosu... "
curl -o /usr/local/bin/gosu -sSL https://github.com/tianon/gosu/releases/download/1.4/gosu-amd64
chmod +x /usr/local/bin/gosu
echo "done"

##### Compile and install nodejs
CONFIG_FLAGS="--prefix=/usr"
CMD=node
DOMAIN=nodejs.org

cd /tmp
curl -sSL https://${DOMAIN}/dist/${NODE_VERSION}/${CMD}-${NODE_VERSION}.tar.gz | tar -xz && \
  cd /tmp/${CMD}-${NODE_VERSION} && \
  ./configure ${CONFIG_FLAGS} && \
  make -j$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) && \
  make install && \
  paxctl -cm /usr/bin/${CMD} && \
  cd / && \
  if [ -x /usr/bin/npm ]; then \
    npm install -g npm && \
    find /usr/lib/node_modules/npm -name test -o -name .bin -type d | xargs rm -rf; \
  fi && \

##### do npm install on the app so it has all the proper modules
cd /usr/local/node/hmda-edit-check-api
gosu nodejs npm cache clean && npm install

##### clean up
apk del git curl make gcc g++ python linux-headers paxctl
rm -rf /etc/ssl /usr/include /usr/share/man /tmp/* \
    /usr/include /root/.npm /root/.node-gyp \
    /usr/local/node/.npm /usr/local/node/.node-gyp \
    /usr/lib/node_modules/npm/man /usr/lib/node_modules/npm/doc \
    /usr/lib/node_modules/npm/html /var/cache/apk/*