#!/bin/sh

echo --- TESTS ---

echo -n "it should install nodejs 0.10.x"
node --version 2>&1 | grep "0.10" > /dev/null
[ "$?" -ne 0 ] && echo fail && exit 1
echo pass
