#!/bin/bash
#
# Name: nodedeploy.bash
# Author: Michael Marod
# Purpose: To automatically deploy node apps
# Requires: zip file be located in /usr/local/nodefiles, this
#       directory will be cleaned at the end of the script.
#

ZIPFILE=hmda-edit-check-api.zip

if ! [[ $ZIPFILE =~ \.zip$ ]]; then
   echo "$0 [zipfile]"
   exit 1
fi

BASENAME=$(basename $ZIPFILE .zip)
NODEDIR=/usr/local/nodefiles
ZIPFILEPATH="${NODEDIR}/${ZIPFILE}"

if [ ! -f $ZIPFILEPATH ]; then
   echo "${ZIPFILEPATH} does not exist!"
   echo "$0 [zipfile]"
   exit 1
fi

BASEDIR=/usr/local/APPS/node/${BASENAME}
INITSCRIPT=/etc/init.d/${BASENAME}
TMPDIRNAME=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1)
TMPDIR="/tmp/${TMPDIRNAME}"

echo "Extacting new application to ${TMPDIR}"
su - node -c "/usr/bin/unzip -q ${ZIPFILEPATH} -d ${TMPDIR}"

echo "Running 'npm install'"
su - node -c "cd $TMPDIR && npm install"

echo "Running 'grunt dist'"
su - node -c "cd $TMPDIR && grunt dist"

ZIPFILEPATH="${TMPDIR}/dist/${ZIPFILE}"

if [ -d "${BASEDIR}" ]; then
    echo "Removing old application at ${BASEDIR}"
    /bin/rm -rf ${BASEDIR}
fi

echo "Extracting new application to ${BASEDIR}"
/usr/bin/unzip -q ${ZIPFILEPATH} -d ${BASEDIR}

/bin/mkdir ${BASEDIR}/logs
/bin/chown node:node ${BASEDIR}/logs

echo "Removing zipfile"
/bin/rm ${ZIPFILEPATH}

echo "Fix permissions"
/bin/chown -R node:node ${BASEDIR}

echo "Restarting Node"
${INITSCRIPT} restart

echo "Done!"
