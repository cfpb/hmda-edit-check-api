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
