FROM node:alpine AS base
RUN apk add --no-cache curl tini
WORKDIR /app
COPY ./package.json ./package-*.json ./yarn.lock ./

FROM base AS deps_prod
WORKDIR /app
RUN yarn install --frozen-lockfile --prefer-offline --production

FROM deps_prod AS deps_dev
WORKDIR /app
RUN yarn install --frozen-lockfile --prefer-offline

FROM deps_dev AS builder
WORKDIR /app
COPY ./src ./src/
COPY ./tsconfig.json ./
RUN yarn build

FROM base AS base_prod
RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-deu tesseract-ocr-data-pol tesseract-ocr-data-rus
COPY --from=deps_prod /app/node_modules/ ./dist/node_modules/
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

FROM base_prod AS prod
WORKDIR /app
COPY --from=builder /app/dist/index.js /app/dist/*.production.*.js ./dist/
ENTRYPOINT ["/sbin/tini", "--", "/docker-entrypoint.sh"]
EXPOSE 8884
HEALTHCHECK CMD curl -f http://127.0.0.1:8884/.well-known/health/healthy || exit 1
ENV NODE_ENV "production"