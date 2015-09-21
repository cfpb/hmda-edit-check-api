#!/bin/sh

echo --- TESTS ---

echo -n "it should install gosu 1.4... "
gosu 2>&1 | grep "version: 1.4" > /dev/null
[ "$?" -ne 0 ] && echo fail && exit 1
echo pass

echo -n "it should install nodejs 0.12.5... "
node --version 2>&1 | grep "0.12.5" > /dev/null
[ "$?" -ne 0 ] && echo fail && exit 1
echo pass