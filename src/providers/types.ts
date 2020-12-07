import { IProcessor } from '../processor';

export interface IProvider {
  start(): Promise<void>;
}

export interface IProviderFactory {
  (context: IProviderFactoryContext): IProvider;
}

export interface IProviderFactoryContext {
  processor: IProcessor;
}
