FROM node:10.15.3-slim
LABEL maintainer="WooLNinesun"

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y --no-install-recommends apt-utils 2>&1 \
    && apt-get install -y --no-install-recommends git procps \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*
ENV DEBIAN_FRONTEND=dialog

# Create app directory
WORKDIR /usr/src/app

EXPOSE 3000
