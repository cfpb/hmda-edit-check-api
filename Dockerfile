FROM mhart/alpine-node:0.10

# Add source and make sure we're working in that dir
ADD . /usr/local/node/hmda-edit-check-api
WORKDIR /usr/local/node/hmda-edit-check-api

# Set the environment
ENV NODE_ENV=production PORT=8000 NODE_TLS_REJECT_UNAUTHORIZED=0

# Install deps and app files
RUN ./docker-scripts/run.sh

# Ensure proper build
RUN ./docker-scripts/tests.sh

EXPOSE ${PORT}

USER notroot

CMD ["node", "server.js"]
