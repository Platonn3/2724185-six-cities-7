import convict, {type Config as ConvictConfig, type Schema} from 'convict';
import formats from 'convict-format-with-validator';
import dotenv from 'dotenv';
import {injectable} from 'inversify';
import type {Config} from './config.interface.js';

export type RestConfigSchema = {
  port: number;
  dbHost: string;
  salt: string;
};

const schema: Schema<RestConfigSchema> = {
  port: {
    doc: 'Порт REST API сервера',
    format: 'port',
    env: 'PORT',
    default: null,
  },
  dbHost: {
    doc: 'IP-адрес сервера базы данных',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: null,
  },
  salt: {
    doc: 'Соль для хеширования паролей',
    format: (value: string): void => {
      if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error('Соль не должна быть пустой.');
      }
    },
    env: 'SALT',
    default: null,
    sensitive: true,
  },
};

convict.addFormats(formats);

@injectable()
export class RestConfig implements Config {
  private readonly config: ConvictConfig<RestConfigSchema>;

  constructor() {
    dotenv.config();
    this.config = convict<RestConfigSchema>(schema);
    this.config.validate({allowed: 'strict'});
  }

  public get<Key extends keyof RestConfigSchema>(key: Key): RestConfigSchema[Key] {
    return this.config.get(key) as RestConfigSchema[Key];
  }
}
