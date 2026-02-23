FROM denoland/deno:debian AS compiler
WORKDIR /app
COPY deno.json deno.lock* ./
COPY src/ ./src/
RUN deno compile --no-check --allow-net --allow-read --allow-write --allow-run --allow-env --allow-sys --output tesseract-server src/index.ts

FROM scratch AS builder
COPY --from=compiler /app/tesseract-server /tesseract-server

FROM debian:bookworm-slim AS monaco
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && curl -sL https://registry.npmjs.org/monaco-editor/-/monaco-editor-0.49.0.tgz \
    | tar -xz --strip-components=1 package/min \
    && rm -rf /var/lib/apt/lists/*

FROM debian:bookworm-slim AS production
RUN apt-get update && apt-get install -y --no-install-recommends \
    tini tesseract-ocr \
    tesseract-ocr-deu tesseract-ocr-kat tesseract-ocr-fra \
    tesseract-ocr-spa tesseract-ocr-pol tesseract-ocr-rus \
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /tesseract-server /usr/local/bin/tesseract-server
COPY ./public/ /app/public/
COPY --from=monaco /min /app/public/vendor/monaco-editor/min
COPY ./deno.json /app/deno.json
WORKDIR /app
ENTRYPOINT ["/usr/bin/tini", "--", "tesseract-server"]
CMD []
EXPOSE 8884
