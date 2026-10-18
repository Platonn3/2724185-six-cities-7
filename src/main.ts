import 'reflect-metadata';
import {createContainer} from './container.js';
import {Application} from './application/application.js';
import {Component} from './shared/types/component.js';

const container = createContainer();
const application = container.get<Application>(Component.Application);

application.init();
