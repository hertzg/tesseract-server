import express, { Request, RequestHandler, Response } from "express";
import {
  HealthChecker,
  HealthEndpoint,
  LivenessEndpoint,
  ReadinessEndpoint,
} from "@cloudnative/health-connect";
import FS from "node:fs";
import Path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";
import { IProcessor, Options } from "../../processor/index.ts";
import argv from "../../argv/index.ts";
import { Readable } from "node:stream";
import { IProvider, IProviderFactory } from "../types.ts";
import { asOptions } from "./decoders.ts";
import OS from "node:os";

const getVersion = (): string => {
  try {
    const denoJsonPath = Path.resolve("deno.json");
    const denoJson = JSON.parse(FS.readFileSync(denoJsonPath, "utf-8"));
    return denoJson.version || "unknown";
  } catch {
    return "unknown";
  }
};

const getMonacoPath = (): string => {
  try {
    const resolved = import.meta.resolve("monaco-editor");
    const monacoDir = Path.dirname(fileURLToPath(resolved));
    return Path.join(monacoDir, "min");
  } catch {
    // Compiled binary: Monaco is embedded via deno compile --include vendor/
    return Path.resolve(
      import.meta.dirname!,
      "..",
      "..",
      "..",
      "vendor",
      "monaco-editor",
      "min",
    );
  }
};

export const createHttpProvider: IProviderFactory = ({
  processor,
  healthChecker,
}) => {
  return new HTTPProvider(processor, healthChecker);
};

class HTTPProvider implements IProvider {
  private readonly app = express();
  private readonly upload = multer({
    storage: multer.diskStorage({
      destination: argv["http.upload.tmpDir"],
    }),
  });

  constructor(
    private readonly tess: IProcessor,
    private readonly health: HealthChecker,
  ) {
    this.app.post(
      "/tesseract",
      // deno-lint-ignore no-explicit-any
      this.upload.single(argv["http.input.fileField"]) as any,
      this._onPost,
    );

    if (argv["http.output.jsonSpaces"] && argv["http.output.jsonSpaces"] > 0) {
      this.app.set("json spaces", argv["http.output.jsonSpaces"]);
    }

    if (argv["http.endpoint.status.enable"]) {
      this.app.get("/status", this._onStatus);
    }

    if (argv["http.endpoint.health.enable"]) {
      this.app.use("/.well-known/health/healthy", HealthEndpoint(this.health));
      this.app.use("/.well-known/health/live", LivenessEndpoint(this.health));
      this.app.use("/.well-known/health/ready", ReadinessEndpoint(this.health));
    }

    if (argv["http.endpoint.webui.enable"]) {
      this.app.use(express.static("public"));
      console.log("webui enabled");
      this.app.use(
        "/vendor/monaco-editor/min",
        express.static(getMonacoPath()),
      );
    }
  }

  private _onStatus: RequestHandler = (_req: Request, res: Response) => {
    this.tess.status().then((status) => {
      res.status(200).json({
        data: {
          version: getVersion(),
          host: {
            hostname: OS.hostname(),
            platform: OS.platform(),
            arch: OS.arch(),
            uptime: OS.uptime(),
            release: OS.release(),
            loadavg: OS.loadavg(),
          },
          processor: status,
        },
      });
    });
  };

  private _getOptions = (
    req: Request,
  ): Options => {
    // deno-lint-ignore no-explicit-any
    const body = (req as any).body;
    return asOptions(
      JSON.parse(body[argv["http.input.optionsField"]]),
    );
  };

  private _getReadable = (
    req: Request,
  ): Readable => {
    // deno-lint-ignore no-explicit-any
    const file = (req as any).file;
    if (!file || !file.size) {
      throw new Error("No or empty file provided");
    }

    return FS.createReadStream(file.path);
  };

  private _onPost: RequestHandler = (req: Request, res: Response) => {
    Promise.all([this._getOptions(req), this._getReadable(req)])
      .catch((reason) => {
        res.status(400).json({
          error: "Request input validation failed",
          reason: String(reason),
        });
        throw reason;
      })
      .then(([options, readable]) => this.tess.execute(options, readable))
      .catch((reason) => {
        res
          .status(500)
          .json({ error: "error processing input", reason: String(reason) });
        throw reason;
      })
      .then((data) => {
        res.status(200).json({
          data: {
            ...data,
            stdout: data.stdout.toString("utf8"),
            stderr: data.stderr.toString("utf8"),
          },
        });
      })
      .catch(() => {
        console.log("Error processing http request");
      });
  };

  start(): Promise<void> {
    return new Promise<void>((resolve) => {
      const srv = this.app.listen(
        argv["http.listen.port"],
        argv["http.listen.address"],
        () => {
          console.log("Listening @ %j", srv.address());
          resolve();
        },
      );
    });
  }
}
