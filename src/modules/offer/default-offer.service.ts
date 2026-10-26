import {inject, injectable} from 'inversify';
import {Component} from '../../shared/types/component.js';
import type {CreateOfferDto} from './offer.entity.js';
import type {OfferDocument, OfferModelType} from './offer.model.js';
import type {OfferService} from './offer-service.interface.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.OfferModel) private readonly offerModel: OfferModelType,
  ) {}

  public async findById(id: string): Promise<OfferDocument | null> {
    return this.offerModel.findById(id).exec();
  }

  public async create(data: CreateOfferDto): Promise<OfferDocument> {
    return this.offerModel.create(data);
  }
}
