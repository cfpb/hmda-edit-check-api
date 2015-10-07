FROM mhart/alpine-node:0.10

ENV NODE_ENV=production

COPY mongo-docker /tmp

# Build
RUN /tmp/run.sh

# Tests
RUN /tmp/tests.sh

# Install app
COPY . /usr/local/app
RUN /tmp/install-app.sh

ENTRYPOINT ["/tmp/entrypoint.sh"]

EXPOSE 27017
CMD ["mongod"]
