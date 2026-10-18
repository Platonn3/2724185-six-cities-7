import pino, {type Logger as PinoLoggerInstance} from 'pino';
import {injectable} from 'inversify';
import type {Logger} from './logger.interface.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoLoggerInstance;

  constructor() {
    this.logger = pino();
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }
}
