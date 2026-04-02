FROM denoland/deno:alpine
RUN apk add --no-cache \
    tini \
    tesseract-ocr \
    tesseract-ocr-data-eng tesseract-ocr-data-deu tesseract-ocr-data-kat \
    tesseract-ocr-data-fra tesseract-ocr-data-spa tesseract-ocr-data-pol \
    tesseract-ocr-data-rus

WORKDIR /app
COPY deno.json deno.lock* ./
RUN deno install
COPY ./public/ ./public/
COPY ./src/ ./src/
COPY build.json* ./
COPY docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["tini", "--", "docker-entrypoint.sh"]
CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-write", "--allow-run", "--allow-env", "--allow-sys", "src/index.ts"]
EXPOSE 8884
