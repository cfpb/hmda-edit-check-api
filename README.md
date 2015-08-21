# HMDA Edit Check API

## This project is a work in progress
Nothing presented in the issues or in this repo is a final product unless it is marked as such.

[![Build Status](https://travis-ci.org/cfpb/hmda-edit-check-api.svg)](https://travis-ci.org/cfpb/hmda-edit-check-api)
[![Coverage Status](https://coveralls.io/repos/cfpb/hmda-edit-check-api/badge.svg)](https://coveralls.io/r/cfpb/hmda-edit-check-api)

## Requirements

The project uses:

 - [NodeJS](http://nodejs.org) JavaScript on the server
   - [KrakenJS](http://krakenjs.com) Framework for convention over configuration and security
 - [MongooseJS](http://mongoosejs.com) Object modeling for MongoDB
   - [Mockgoose](https://github.com/mccormicka/Mockgoose) Mocking mongoose connections for unit testing
 - [MongoDB](http://mongodb.org) Highly scalable document based NoSQL database

## How to get this running or how to use it

### First Steps
Make sure you have [NodeJS](https://nodejs.org) installed (currently, version 0.10.33), and you can use the `npm` command:

```shell
$ npm version
```

Install [Grunt](http://gruntjs.com) globally:

```shell
$ npm install -g grunt-cli
```

Then install dependencies from the project root directory:

```shell
$ npm install
```

Running the tests:
```shell
$ grunt test
```

### Running locally
Make sure you have a functional instance of [MongoDB](http://mongodb.org) installed and running

```shell
$ mongo test
MongoDB shell version: 2.6.5
connecting to: test
> exit
bye
```

 > If your instance of MongoDB is installed somewhere other than your local machine, you will need to update [`config/sandbox.json`](config/sandbox.json) and modify the `mongoConfig` section with your instance details.

Start the server with a grunt task:

```shell
$ grunt serve
```

This will make the application listen on `localhost:8000` for requests, and will watch the source code for changes and reload the application as necessary.

### Deploying
 > Make sure you have modified [`config/config.json`](config/config.json) with details about your deployment MongoDB instance in the `mongoConfig` section.

Now you can run a grunt task to build an archive of the application:

```shell
$ grunt dist
```

This task produces `dist/hmda-edit-check-api.zip`, which can then be deployed by your continuous integration platform, or manually deployed into your server environment.

### Using Docker for deployment

This project has defined two Docker containers for your convenience. One for the MongoDB instance, and one for this nodejs project. The MongoDB container is defined in the `mongo-docker` directory, while the project container is defined in the `Dockerfile` in the project root.

For ease of use, there are two scripts provided to build and run the containers respectively. You can build both Docker images using `./build-docker-containers.sh` and run them with `./run-docker-containers.sh`

The project Docker container expects that you'll tag the MongoDB Docker image as `hmda-pilot-mongodb` and use `--link hmda-pilot-mongodb` when you run it, otherwise, you have to set the following environment variables manually during run:
 - `HMDA_PILOT_MONGODB_HOST`
 - `HMDA_PILOT_MONGODB_PORT`

If you chose to not use the scripts, you will also have to load the MongoDB instance with data. This is done with a script provided in the API project.

Here is an example of both using the environment variables and running the data loading script:

```
docker run -d -e "HMDA_PILOT_MONGODB_HOST=my.mongo.server" -e "HMDA_PILOT_MONGODB_PORT=27000" --name hmda-pilot-api -p 8000:8000 hmda-pilot-api
docker exec -it hmda-pilot-api node /usr/local/node/hmda-edit-check-api/data/reload_mongo.js
```

## API Documentation

Documentation of the REST API is maintained within the source code using [apiDoc](http://apidocjs.com/) endpoint method comments.

To generate the API documentation, run the grunt task:
```shell
$ grunt generate-docs
```

You can then open './docs/index.html' in your browser to view the API documentation.

## Getting involved

For details on how to get involved, please first read our [CONTRIBUTING](CONTRIBUTING.md) guidelines.
This project follows an adapted pull request [workflow](https://github.com/cfpb/hmda-pilot/wiki/GitHub-workflow) on top of GitHub, please consult the details before adding features to the project.


----

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)
