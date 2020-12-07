import express, { Request, Response } from 'express';
import FS from 'fs';
import multer from 'multer';
import { IProcessor, Options } from '../processor';
import argv from '../argv';
import { Readable } from 'stream';
import { IProvider, IProviderFactory } from './types';

export const createHttpProvider: IProviderFactory = ({ processor }) => {
  return new HTTPProvider(processor);
};

class HTTPProvider implements IProvider {
  private readonly app = express();
  private readonly upload = multer({
    storage: multer.diskStorage({
      destination: argv['http.tmp-dir'],
    }),
  });

  constructor(private tess: IProcessor) {
    this.app.post('/', this.upload.single('file'), this._onPost);
  }

  private _getOptions = async (req: Request): Promise<Options> => {
    // TODO: Validate input
    return JSON.parse(req.body.options);
  };

  private _getReadable = async (req: Request): Promise<Readable> => {
    return FS.createReadStream(req.file.path);
  };

  private _onPost = (req: Request, res: Response) => {
    Promise.all([this._getOptions(req), this._getReadable(req)])
      .catch(reason => {
        res.status(400).json({
          error: 'request missing multipart options or file filed',
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
      this.app.listen(8884, () => {
        console.log('Listening...');
        resolve();
      });
    });
  }
}
