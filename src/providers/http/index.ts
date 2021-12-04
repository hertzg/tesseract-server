import express, { Request, Response } from 'express';
import {
  HealthChecker,
  HealthEndpoint,
  LivenessEndpoint,
  ReadinessEndpoint,
} from '@cloudnative/health-connect';
import FS from 'fs';
import multer from 'multer';
import { IProcessor, Options } from '../../processor';
import argv from '../../argv';
import { Readable } from 'stream';
import { IProvider, IProviderFactory } from '../types';
import { asOptions } from './decoders';
import OS from 'os';

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
      destination: argv['http.upload.tmpDir'],
    }),
  });

  constructor(
    private readonly tess: IProcessor,
    private readonly health: HealthChecker,
  ) {
    this.app.post(
      '/tesseract',
      this.upload.single(argv['http.input.fileField']),
      this._onPost,
    );

    if (argv['http.output.jsonSpaces'] && argv['http.output.jsonSpaces'] > 0) {
      this.app.set('json spaces', argv['http.output.jsonSpaces']);
    }

    if (argv['http.endpoint.status.enable']) {
      this.app.get('/status', this._onStatus);
    }

    if (argv['http.endpoint.health.enable']) {
      this.app.use('/.well-known/health/healthy', HealthEndpoint(this.health));
      this.app.use('/.well-known/health/live', LivenessEndpoint(this.health));
      this.app.use('/.well-known/health/ready', ReadinessEndpoint(this.health));
    }
  }

  private _onStatus = (req: Request, res: Response) => {
    this.tess.status().then(status => {
      res.status(200).json({
        data: {
          version: process.env?.npm_package_version || 'unknown',
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

  private _getOptions = async (req: Request): Promise<Options> => {
    return asOptions(JSON.parse(req.body[argv['http.input.optionsField']]));
  };

  private _getReadable = async (req: Request): Promise<Readable> => {
    return FS.createReadStream(req.file.path);
  };

  private _onPost = (req: Request, res: Response) => {
    Promise.all([this._getOptions(req), this._getReadable(req)])
      .catch(reason => {
        res.status(400).json({
          error: 'Request input validation failed',
          reason: String(reason),
        });
        throw reason;
      })
      .then(([options, readable]) => this.tess.execute(options, readable))
      .catch(reason => {
        res
          .status(500)
          .json({ error: 'error processing input', reason: String(reason) });
        throw reason;
      })
      .then(data => {
        res.status(200).json({
          data: {
            ...data,
            stdout: data.stdout.toString('utf8'),
            stderr: data.stderr.toString('utf8'),
          },
        });
      })
      .catch(() => {
        console.log('Error processing http request');
      });
  };

  start(): Promise<void> {
    return new Promise<void>(resolve => {
      const srv = this.app.listen(8884, () => {
        console.log('Listening @ %j', srv.address());
        resolve();
      });
    });
  }
}
