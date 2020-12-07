FROM node:alpine AS builder

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./src ./src/
COPY ./tsconfig.json ./
RUN yarn build

FROM node:alpine
RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-deu tesseract-ocr-data-pol tesseract-ocr-data-rus

WORKDIR /app

COPY ./package.json ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist/* ./dist/

CMD dist/index.js
