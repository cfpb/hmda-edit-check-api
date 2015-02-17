#!/bin/bash
#
# Name: nodedeploy.bash
# Author: Michael Marod
# Purpose: To automatically deploy node apps
# Requires: zip file be located in /usr/local/nodefiles, this
#       directory will be cleaned at the end of the script.
#

TMPNAME=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1)
LOG="/tmp/${TMPNAME}.log"

exec > >(tee $LOG)
exec 2>&1

npm install -g npm@next
npm install -g grunt-cli
TMPDIR="/tmp/${TMPNAME}"
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

echo "Stopping ${BASENAME}"
${INITSCRIPT} stop

echo "Extracting new application to ${TMPDIR}"
su - node -c "/usr/bin/unzip -q ${ZIPFILEPATH} -d ${TMPDIR}"

echo "Running 'npm install'"
su - node -c "cd $TMPDIR && npm install"

echo "Checking if database needs an update..."
diff -q ${BASEDIR}/data ${TMPDIR}/data

if [ "$?" -ne "0" ]; then
    echo "${BASEDIR}/data ${TMPDIR}/data and differ... Re-populating the ${NODE_ENV} database."
    su - node -c "cd ${TMPDIR} && node data/reload_mongo.js"
else
    echo "No database updates."
fi

if [ -d "${BASEDIR}" ]; then
    echo "Removing old application at ${BASEDIR}"
    /bin/rm -rf ${BASEDIR}
fi

echo "Moving new application to ${BASEDIR}"
/bin/cp -r ${TMPDIR} ${BASEDIR}

/bin/mkdir ${BASEDIR}/logs

echo "Removing zipfile"
/bin/rm "${NODEDIR}/${ZIPFILE}"

echo "Removing codedeploy temp directory"
/bin/rm -rf "${TMPDIR}"

echo "Fix permissions"
/bin/chown -R node:node ${BASEDIR}

echo "Restarting Node"
${INITSCRIPT} start

echo "Done!"
