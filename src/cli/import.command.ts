import chalk from 'chalk';
import {inject, injectable} from 'inversify';
import type {Offer} from '../types/index.js';
import type {DatabaseClient} from '../shared/libs/database-client/database-client.interface.js';
import type {Command} from './command.interface.js';
import {TsvFileReader} from '../shared/libs/file-reader/tsv-file-reader.js';
import type {OfferService} from '../modules/offer/offer-service.interface.js';
import type {UserService} from '../modules/user/user-service.interface.js';
import {Component} from '../shared/types/component.js';

@injectable()
export class ImportCommand implements Command {
  public readonly name = '--import';

  constructor(
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {}

  public async execute(parameters: string[]): Promise<void> {
    const [filepath, databaseUri] = parameters;

    if (!filepath || !databaseUri) {
      throw new Error('Использование: --import <filepath> <database-uri>');
    }

    await this.databaseClient.connect(databaseUri);

    try {
      const fileReader = new TsvFileReader(filepath);
      const importedCount = await fileReader.read((offer) => this.saveOffer(offer));

      console.info(chalk.bold.green(`Импортировано предложений: ${importedCount}`));
    } finally {
      await this.databaseClient.disconnect();
    }
  }

  private async saveOffer({author, ...offer}: Offer): Promise<void> {
    const user = await this.userService.findByEmail(author.email)
      ?? await this.userService.create(author);

    await this.offerService.create({...offer, author: user._id});
  }
}
