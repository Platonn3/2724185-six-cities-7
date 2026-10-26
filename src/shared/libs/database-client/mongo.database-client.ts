import {inject, injectable} from 'inversify';
import mongoose from 'mongoose';
import type {Logger} from '../logger/logger.interface.js';
import {Component} from '../../types/component.js';
import type {DatabaseClient} from './database-client.interface.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {}

  public async connect(uri: string): Promise<void> {
    this.logger.info('Попытка подключения к MongoDB.');
    await mongoose.connect(uri);
    this.logger.info('Соединение с MongoDB установлено.');
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Соединение с MongoDB закрыто.');
  }
}
