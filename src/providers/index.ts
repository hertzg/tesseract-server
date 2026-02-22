import { IProvider, IProviderFactoryContext } from './types.ts';
import { createHttpProvider } from './http/index.ts';

export const createProviders = (
  context: IProviderFactoryContext,
): Providers => {
  return new Providers(context);
};

export interface IProviders {
  start(): Promise<void>;
}

class Providers implements IProviders {
  private readonly http: IProvider;

  constructor(private context: IProviderFactoryContext) {
    this.http = createHttpProvider(context);
  }

  start = async (): Promise<void> => {
    await this.http.start();
  };
}
