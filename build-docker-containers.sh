#!/bin/sh

# Remove any previous instance of the mongodb image
docker rmi -f hmda-pilot-mongodb
# Build the mongodb image as defined in the mongo-docker dir
docker build -t hmda-pilot-mongodb mongo-docker

# Remove any previous instance of the api image
docker rmi -f hmda-pilot-api
# Build the api image as defined in the Dockerfile in the current dir
docker build -t hmda-pilot-api .