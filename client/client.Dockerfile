FROM node:22.11-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

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

WORKDIR /app/client
COPY /client/package.json /client/next.config.ts /client/bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS builder

WORKDIR /app
COPY --from=deps /app/client/node_modules ./client/node_modules
COPY /client ./client

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app/client
RUN npm run prepare
RUN npm run build

FROM base AS runner

WORKDIR /app/client

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/client/.next ./.next
COPY --from=builder /app/client/public ./public
COPY --from=builder /app/client/styled-system ./styled-system
COPY --from=builder /app/client/node_modules ./node_modules
COPY --from=builder /app/client/package.json ./package.json
COPY --from=builder /app/client/next.config.ts ./next.config.ts

USER nextjs

ARG PORT

EXPOSE ${PORT}
ENV PORT=${PORT}

CMD ["npm", "start"]
