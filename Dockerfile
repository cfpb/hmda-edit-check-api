FROM alpine:3.2

# Add source and make sure we're working in that dir
ADD . /usr/local/node/hmda-edit-check-api
WORKDIR /usr/local/node/hmda-edit-check-api

# Set the environment
ENV NODE_VERSION=v0.12.5 NODE_ENV=production PORT=8000 NODE_TLS_REJECT_UNAUTHORIZED=0

# Use a custom build script instead of messy chained together RUN
# or multiple RUN statements that add bloat to the image
RUN ./docker-scripts/run.sh

# Tests. Yes, Virginia, you can test Docker builds
RUN ./docker-scripts/tests.sh

EXPOSE ${PORT}
COPY ./docker-scripts/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "server.js"]