import {inject, injectable} from 'inversify';
import type {Config} from '../shared/libs/config/config.interface.js';
import type {Logger} from '../shared/libs/logger/logger.interface.js';
import {Component} from '../shared/types/component.js';

@injectable()
export class Application {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config,
  ) {}

  public init(): void {
    this.logger.info(`Порт приложения: ${this.config.get('port')}`);
    this.logger.info('Приложение инициализировано.');
  }
}
