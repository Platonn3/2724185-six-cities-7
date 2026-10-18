import {Container} from 'inversify';
import {Application} from './application/application.js';
import type {Config} from './shared/libs/config/config.interface.js';
import {RestConfig} from './shared/libs/config/rest.config.js';
import type {Logger} from './shared/libs/logger/logger.interface.js';
import {PinoLogger} from './shared/libs/logger/pino.logger.js';
import {Component} from './shared/types/component.js';

export function createContainer(): Container {
  const container = new Container();

  container.bind<Application>(Component.Application).to(Application).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config>(Component.Config).to(RestConfig).inSingletonScope();

  return container;
}
