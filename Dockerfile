FROM denoland/deno:debian AS production
RUN apt-get update && apt-get install -y --no-install-recommends \
    tini tesseract-ocr \
    tesseract-ocr-deu tesseract-ocr-kat tesseract-ocr-fra \
    tesseract-ocr-spa tesseract-ocr-pol tesseract-ocr-rus \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY deno.json deno.lock* ./
RUN deno install
COPY ./public/ ./public/
COPY ./src/ ./src/
ENTRYPOINT ["/usr/bin/tini", "--", "deno", "run", "--allow-net", "--allow-read", "--allow-write", "--allow-run", "--allow-env", "--allow-sys", "src/index.ts"]
CMD []
EXPOSE 8884
