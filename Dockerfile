FROM node:16-alpine3.12

USER node

WORKDIR /usr/src/app/client
COPY --chown=node:node ./client/build ./build
COPY --chown=node:node ./client/package-lock.json .
COPY --chown=node:node ./client/package.json .
RUN npm ci --only-production

WORKDIR /usr/src/app
COPY --chown=node:node ./build ./build
COPY --chown=node:node ./package-lock.json .
COPY --chown=node:node ./package.json .
RUN npm ci --only-production

EXPOSE 8080

CMD node ./build/index.js