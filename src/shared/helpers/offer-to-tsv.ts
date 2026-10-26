import type {Offer} from '../../types/index.js';

export function offerToTsv(offer: Offer): string {
  return [
    offer.title,
    offer.description,
    offer.publicationDate.toISOString(),
    offer.city.name,
    offer.previewImage,
    offer.images.join(';'),
    offer.isPremium,
    offer.isFavorite,
    offer.rating,
    offer.housingType,
    offer.roomCount,
    offer.guestCount,
    offer.rentPrice,
    offer.amenities.join(';'),
    offer.author.name,
    offer.author.email,
    offer.author.avatarPath ?? '',
    offer.author.password,
    offer.author.type,
    offer.location.latitude,
    offer.location.longitude,
  ].join('\t');
}
