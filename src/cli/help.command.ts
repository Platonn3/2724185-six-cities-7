import chalk from 'chalk';
import type {Command} from './command.interface.js';

const HELP_MESSAGE = `
Программа для подготовки данных для REST API сервера.

Пример: npm run cli -- <command> [arguments]

Команды:
  --help                      Печатает этот текст
  --version                   Выводит номер версии
  --import <path> <db-uri>    Импортирует данные из TSV в MongoDB
  --generate <n> <path> <url> Генерирует тестовые данные в формате TSV
`;

export class HelpCommand implements Command {
  public readonly name = '--help';

  public execute(): void {
    console.info(chalk.cyan(HELP_MESSAGE));
  }
}
