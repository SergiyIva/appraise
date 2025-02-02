FROM node:22.11-alpine AS base

FROM base AS deps

RUN apk --no-cache add ca-certificates wget
RUN if [[ $(uname -m) == "aarch64" ]] ; \
    then \
    # aarch64
    wget https://raw.githubusercontent.com/squishyu/alpine-pkg-glibc-aarch64-bin/master/glibc-2.26-r1.apk ; \
    apk add --no-cache --allow-untrusted --force-overwrite glibc-2.26-r1.apk ; \
    rm glibc-2.26-r1.apk ; \
    else \
    # x86_64
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk ; \
    apk add --no-cache --allow-untrusted --force-overwrite glibc-2.28-r0.apk ; \
    rm glibc-2.28-r0.apk ; \
    fi
RUN npm install -g bun

WORKDIR /app/server
COPY /server/package.json /server/nest-cli.json /server/bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS builder

WORKDIR /app
COPY --from=deps /app/server/node_modules ./server/node_modules
COPY /server ./server

WORKDIR /app/server
RUN npm run build

ARG PORT

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]