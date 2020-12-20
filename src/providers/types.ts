import { IProcessor } from '../processor';
import { HealthChecker } from '@cloudnative/health-connect';

export interface IProvider {
  start(): Promise<void>;
}

export interface IProviderFactory {
  (context: IProviderFactoryContext): IProvider;
}

export interface IProviderFactoryContext {
  processor: IProcessor;
  healthChecker: HealthChecker;
}
