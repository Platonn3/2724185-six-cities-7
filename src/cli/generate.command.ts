import chalk from 'chalk';
import type {Command} from './command.interface.js';
import {offerToTsv} from '../shared/helpers/offer-to-tsv.js';
import {TsvFileWriter} from '../shared/libs/file-writer/tsv-file-writer.js';
import {getMockServerData} from '../shared/libs/http-client/http-client.js';
import {OfferGenerator} from '../shared/libs/offer-generator/offer-generator.js';

export class GenerateCommand implements Command {
  public readonly name = '--generate';

  public async execute(parameters: string[]): Promise<void> {
    const [countValue, filepath, url] = parameters;
    const count = Number(countValue);

    if (!countValue || !filepath || !url) {
      throw new Error('Использование: --generate <n> <filepath> <url>');
    }

    if (!Number.isSafeInteger(count) || count <= 0) {
      throw new Error('Количество предложений должно быть положительным целым числом.');
    }

    const sourceData = await getMockServerData(url);
    const generator = new OfferGenerator(sourceData);
    const writer = new TsvFileWriter(filepath);

    await writer.write(count, () => offerToTsv(generator.generate()));

    console.info(chalk.green(`Создано предложений: ${count}`));
    console.info(chalk.green(`Файл: ${filepath}`));
  }
}
