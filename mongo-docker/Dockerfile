# Based roughly around official MongoDB docker image
# https://github.com/docker-library/mongo/blob/master/2.6/Dockerfile
FROM alpine:3.2

# Use a custom build script instead of messy chained together RUN
# or multiple RUN statements that add bloat to the image
ADD run.sh /tmp/run.sh
RUN /tmp/run.sh && rm /tmp/run.sh

# Tests. Yes, Virginia, you can test Docker builds
ADD tests.sh /tmp/tests.sh
RUN /tmp/tests.sh && rm /tmp/tests.sh

VOLUME /data/db
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 27017
CMD ["mongod"]