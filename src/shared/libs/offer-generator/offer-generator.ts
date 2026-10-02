import type {HousingType, MockServerData, Offer} from '../../../types/index.js';
import {CITY_LOCATIONS} from '../../constants/cities.js';
import {
  getRandomFloat,
  getRandomInteger,
  getRandomItem,
  getRandomItems,
} from '../../helpers/random.js';

const HOUSING_TYPES: readonly HousingType[] = ['apartment', 'house', 'room', 'hotel'];
const IMAGE_COUNT = 6;

function validateSourceData(data: MockServerData): void {
  const requiredCollections = [
    data.titles,
    data.descriptions,
    data.cities,
    data.previewImages,
    data.amenities,
    data.users,
  ];

  if (requiredCollections.some((collection) => collection.length === 0)) {
    throw new Error('JSON Server вернул неполные данные для генерации.');
  }

  if (data.images.length < IMAGE_COUNT) {
    throw new Error(`Для генерации требуется минимум ${IMAGE_COUNT} изображений.`);
  }
}

function getPublicationDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() - getRandomInteger(0, 7));

  return date;
}

export class OfferGenerator {
  constructor(private readonly data: MockServerData) {
    validateSourceData(data);
  }

  public generate(): Offer {
    const cityName = getRandomItem(this.data.cities);
    const location = CITY_LOCATIONS[cityName];

    return {
      title: getRandomItem(this.data.titles),
      description: getRandomItem(this.data.descriptions),
      publicationDate: getPublicationDate(),
      city: {name: cityName, location},
      previewImage: getRandomItem(this.data.previewImages),
      images: getRandomItems(this.data.images, IMAGE_COUNT),
      isPremium: getRandomItem([true, false]),
      isFavorite: getRandomItem([true, false]),
      rating: getRandomFloat(1, 5),
      housingType: getRandomItem(HOUSING_TYPES),
      roomCount: getRandomInteger(1, 8),
      guestCount: getRandomInteger(1, 10),
      rentPrice: getRandomInteger(100, 100_000),
      amenities: getRandomItems(
        this.data.amenities,
        getRandomInteger(1, this.data.amenities.length),
      ),
      author: getRandomItem(this.data.users),
      commentCount: 0,
      location,
    };
  }
}
