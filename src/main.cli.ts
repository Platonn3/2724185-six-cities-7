#!/usr/bin/env node

import chalk from 'chalk';
import 'reflect-metadata';
import {CliApplication} from './cli/cli-application.js';
import {GenerateCommand} from './cli/generate.command.js';
import {HelpCommand} from './cli/help.command.js';
import {ImportCommand} from './cli/import.command.js';
import {VersionCommand} from './cli/version.command.js';
import {createContainer} from './container.js';
import {Component} from './shared/types/component.js';

const container = createContainer();

const cliApplication = new CliApplication([
  new HelpCommand(),
  new VersionCommand(),
  container.get<ImportCommand>(Component.ImportCommand),
  new GenerateCommand(),
]);

try {
  await cliApplication.run(process.argv.slice(2));
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(chalk.red(`Ошибка: ${message}`));
  process.exitCode = 1;
}
