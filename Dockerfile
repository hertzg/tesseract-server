FROM denoland/deno:alpine AS compiler
WORKDIR /app
COPY deno.json deno.lock* ./
COPY src/ ./src/
RUN deno compile --allow-all --output tesseract-server src/index.ts

FROM scratch AS builder
COPY --from=compiler /app/tesseract-server /tesseract-server

FROM alpine:3.21 AS production
RUN apk add --no-cache tini tesseract-ocr \
    tesseract-ocr-data-deu tesseract-ocr-data-kat tesseract-ocr-data-fra \
    tesseract-ocr-data-spa tesseract-ocr-data-pol tesseract-ocr-data-rus
COPY --from=builder /tesseract-server /usr/local/bin/tesseract-server
COPY ./public/ /app/public/
COPY ./deno.json /app/deno.json
WORKDIR /app
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["tesseract-server"]
EXPOSE 8884
