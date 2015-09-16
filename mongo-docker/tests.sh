#!/bin/sh

echo --- TESTS ---

echo -n "it should install gosu 1.4... "
gosu 2>&1 | grep "version: 1.4" > /dev/null
[ "$?" -ne 0 ] && echo fail && exit 1
echo pass

echo -n "it should install mongodb 3.0... "
mongo --version 2>&1 | grep "version: 3.0" > /dev/null
[ "$?" -ne 0 ] && echo fail && exit 1
echo pass