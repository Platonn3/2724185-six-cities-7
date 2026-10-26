import {Schema, model, type HydratedDocument, type Model} from 'mongoose';
import type {OfferEntity} from './offer.entity.js';

const locationSchema = new Schema({
  latitude: {type: Number, required: true},
  longitude: {type: Number, required: true},
}, {_id: false});

const citySchema = new Schema({
  name: {
    type: String,
    enum: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'],
    required: true,
  },
  location: {type: locationSchema, required: true},
}, {_id: false});

const offerSchema = new Schema<OfferEntity>({
  title: {type: String, required: true},
  description: {type: String, required: true},
  publicationDate: {type: Date, required: true},
  city: {type: citySchema, required: true},
  previewImage: {type: String, required: true},
  images: {type: [String], required: true},
  isPremium: {type: Boolean, required: true},
  isFavorite: {type: Boolean, required: true},
  rating: {type: Number, required: true},
  housingType: {
    type: String,
    enum: ['apartment', 'house', 'room', 'hotel'],
    required: true,
  },
  roomCount: {type: Number, required: true},
  guestCount: {type: Number, required: true},
  rentPrice: {type: Number, required: true},
  amenities: {
    type: [String],
    enum: [
      'Breakfast',
      'Air conditioning',
      'Laptop friendly workspace',
      'Baby seat',
      'Washer',
      'Towels',
      'Fridge',
    ],
    required: true,
  },
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  commentCount: {type: Number, required: true},
  location: {type: locationSchema, required: true},
}, {
  collection: 'offers',
  timestamps: true,
});

export type OfferDocument = HydratedDocument<OfferEntity>;
export type OfferModelType = Model<OfferEntity>;

export const OfferModel = model<OfferEntity>('Offer', offerSchema);
