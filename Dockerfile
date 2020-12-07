FROM node:alpine AS base
WORKDIR /app
COPY ./package.json ./package-*.json ./yarn.lock ./

FROM base AS prodDeps
WORKDIR /app
RUN yarn install --frozen-lockfile --production

FROM prodDeps AS devDeps
WORKDIR /app
RUN yarn install --frozen-lockfile

FROM devDeps as builder
WORKDIR /app
COPY ./src ./src/
COPY ./tsconfig.json ./
RUN yarn build

FROM prodDeps as prod
RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-deu tesseract-ocr-data-pol tesseract-ocr-data-rus

FROM prod
WORKDIR /app
COPY --from=builder /app/dist/* ./dist/
CMD dist/index.js
