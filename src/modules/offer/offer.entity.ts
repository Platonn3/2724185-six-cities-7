import type {Types} from 'mongoose';
import type {Offer} from '../../types/index.js';

export type CreateOfferDto = Omit<Offer, 'author'> & {
  author: Types.ObjectId;
};

export interface OfferEntity extends CreateOfferDto {
  createdAt: Date;
  updatedAt: Date;
}
