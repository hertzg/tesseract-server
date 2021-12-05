FROM node:16.13.1-alpine3.14 AS base
RUN apk add --no-cache tini #curl
WORKDIR /app
COPY ./package.json /yarn.lock ./

FROM base AS deps_prod
WORKDIR /app
RUN env && ls -lah /usr/local/bin
RUN /usr/local/bin/yarn install --production

FROM base AS base_prod
RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-deu tesseract-ocr-data-pol tesseract-ocr-data-rus
COPY --from=deps_prod /app/node_modules/ ./dist/node_modules/
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/sbin/tini", "--", "/docker-entrypoint.sh"]
EXPOSE 8884
#HEALTHCHECK CMD curl -f http://127.0.0.1:8884/.well-known/health/healthy || exit 1
ENV NODE_ENV "production"

FROM base_prod AS prod_copy_dist
ARG DIST_SRC
WORKDIR /app
COPY $DIST_SRC/index.js $DIST_SRC/*.production.*.js ./dist/

FROM deps_prod AS deps_dev
WORKDIR /app
RUN /usr/local/bin/yarn install

FROM deps_dev AS builder
WORKDIR /app
COPY ./src ./src/
COPY ./tsconfig.json ./
RUN /usr/local/bin/yarn build

FROM base_prod AS prod_build_dist
WORKDIR /app
COPY --from=builder /app/dist/index.js /app/dist/*.production.*.js ./dist/
