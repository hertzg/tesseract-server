FROM node:alpine AS base
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

FROM base_prod AS prod
WORKDIR /app
COPY --from=builder /app/dist/index.js /app/dist/*.production.*.js ./dist/
CMD node dist/index.js
EXPOSE 8884
ENV NODE_ENV "production"