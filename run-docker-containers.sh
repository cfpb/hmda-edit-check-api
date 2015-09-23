#!/bin/sh

# Remove any current container for mongodb
docker rm -f hmda-pilot-mongodb
# Run the mongodb container
docker run -d --name hmda-pilot-mongodb hmda-pilot-mongodb

# Remove any current container for the api
docker rm -f hmda-pilot-api
# Run the api container, linking in the mongodb container
docker run -d --link hmda-pilot-mongodb:hmda-pilot-mongodb --name hmda-pilot-api -p 8000:8000 hmda-pilot-api
# exec a nodejs script in the api container to reload the database
docker exec -it hmda-pilot-api gosu nodejs node /usr/local/node/hmda-edit-check-api/data/reload_mongo.js
