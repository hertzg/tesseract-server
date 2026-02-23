# Stage: Download Monaco (for local builds; skipped in CI via build-contexts)
FROM debian:bookworm-slim AS monaco-download
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && curl -sL https://registry.npmjs.org/monaco-editor/-/monaco-editor-0.49.0.tgz \
    | tar -xz --strip-components=1 package/min \
    && rm -rf /var/lib/apt/lists/*

# Stage: Compile (for local builds; skipped in CI via build-contexts)
FROM denoland/deno:debian AS compiler
WORKDIR /app
COPY deno.json deno.lock* ./
COPY src/ ./src/
COPY --from=monaco-download /min ./vendor/monaco-editor/min/
RUN deno compile --include vendor --no-check --allow-net --allow-read --allow-write --allow-run --allow-env --allow-sys --output tesseract-server src/index.ts

# Stage: Builder (overridden in CI via build-contexts: builder=./compiled/)
FROM scratch AS builder
COPY --from=compiler /app/tesseract-server /tesseract-server

# Stage: Production — layer order: most stable → least stable
FROM debian:bookworm-slim AS production
RUN apt-get update && apt-get install -y --no-install-recommends \
    tini tesseract-ocr \
    tesseract-ocr-deu tesseract-ocr-kat tesseract-ocr-fra \
    tesseract-ocr-spa tesseract-ocr-pol tesseract-ocr-rus \
    && rm -rf /var/lib/apt/lists/*
COPY ./public/ /app/public/
COPY ./deno.json /app/deno.json
WORKDIR /app
COPY --from=builder /tesseract-server /usr/local/bin/tesseract-server
ENTRYPOINT ["/usr/bin/tini", "--", "tesseract-server"]
CMD []
EXPOSE 8884
