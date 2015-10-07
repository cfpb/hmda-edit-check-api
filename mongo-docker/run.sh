#!/bin/sh

##### add dependencies
# Add wget to download archives, libstdc++ for mongo
apk --update add bash wget libstdc++
# We need shadow to create user/group for mongo, requires testing repo at this time
apk add shadow --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/

#### Need some hacks for mongodb package to work correctly on Alpine
# See: https://github.com/gliderlabs/docker-alpine/issues/11
# 1. install GLibc (which is not the cleanest solution at all)
# 2. hotfix /etc/nsswitch.conf, which is apperently required by glibc and is not used in Alpine Linux
wget --no-check-certificate -q -O /tmp/glibc-2.21-r2.apk "https://circle-artifacts.com/gh/andyshinn/alpine-pkg-glibc/6/artifacts/0/home/ubuntu/alpine-pkg-glibc/packages/x86_64/glibc-2.21-r2.apk"
wget --no-check-certificate -q -O /tmp/glibc-bin-2.21-r2.apk "https://circle-artifacts.com/gh/andyshinn/alpine-pkg-glibc/6/artifacts/0/home/ubuntu/alpine-pkg-glibc/packages/x86_64/glibc-bin-2.21-r2.apk"
apk add --allow-untrusted /tmp/glibc-2.21-r2.apk /tmp/glibc-bin-2.21-r2.apk
/usr/glibc/usr/bin/ldconfig /lib /usr/glibc/usr/lib
echo 'hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4' >> /etc/nsswitch.conf

##### add our user and group first to make sure their IDs get assigned consistently
mkdir -p /data/db
groupadd -r mongodb -g 1000
useradd -u 1000 -r -g 1000 -d /data/db mongodb
chown -R mongodb:mongodb /data/db

##### install gosu for easy step-down from root
echo -n "--- installing gosu... "
wget --no-check-certificate -q -O /usr/local/bin/gosu https://github.com/tianon/gosu/releases/download/1.4/gosu-amd64
chmod +x /usr/local/bin/gosu
echo "done"

##### install generic linux x86_64 mongodb
MONGO_VERSION="3.0.5"
echo -n "--- installing mongodb... "
wget --no-check-certificate -q -O /tmp/mongodb.tgz https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-$MONGO_VERSION.tgz
tar -zxf /tmp/mongodb.tgz -C /tmp
chown -R root:root /tmp/mongodb-linux-x86_64-$MONGO_VERSION
mv /tmp/mongodb-linux-x86_64-$MONGO_VERSION/bin/* /usr/local/bin
echo "done"

##### create app area for data loading
mkdir -p /usr/local/app

##### Clean up after ourselves
# We don't need wget any longer
apk del wget
# We don't need these source packages
rm -rf /tmp/glibc-*
rm -rf /tmp/mongodb*
# Clean up the apk cache
rm -rf /var/cache/apk/*
