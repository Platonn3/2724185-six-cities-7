import type {CreateOfferDto} from './offer.entity.js';
import type {OfferDocument} from './offer.model.js';

export interface OfferService {
  findById(id: string): Promise<OfferDocument | null>;
  create(data: CreateOfferDto): Promise<OfferDocument>;
}
