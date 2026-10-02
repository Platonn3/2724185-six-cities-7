import {createReadStream} from 'node:fs';
import {createInterface} from 'node:readline';
import type {
  Amenity,
  HousingType,
  Offer,
  User,
  UserType,
} from '../../../types/index.js';
import {CITY_LOCATIONS, CITY_NAMES} from '../../constants/cities.js';

const TSV_FIELD_COUNT = 21;
const HOUSING_TYPES: readonly HousingType[] = ['apartment', 'house', 'room', 'hotel'];
const USER_TYPES: readonly UserType[] = ['regular', 'pro'];
const AMENITIES: readonly Amenity[] = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge',
];

function isOneOf<T extends string>(value: string, values: readonly T[]): value is T {
  return values.some((item) => item === value);
}

function parseEnum<T extends string>(
  value: string,
  values: readonly T[],
  fieldName: string,
): T {
  if (!isOneOf(value, values)) {
    throw new Error(`Недопустимое значение поля «${fieldName}»: ${value}`);
  }

  return value;
}

function parseBoolean(value: string): boolean {
  if (value !== 'true' && value !== 'false') {
    throw new Error(`Ожидалось логическое значение, получено: ${value}`);
  }

  return value === 'true';
}

function parseNumber(value: string, fieldName: string): number {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(`Поле «${fieldName}» должно быть числом, получено: ${value}`);
  }

  return parsedValue;
}

function parseDate(value: string): Date {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Некорректная дата: ${value}`);
  }

  return date;
}

function parseOffer(line: string, lineNumber: number): Offer {
  const fields = line.split('\t');

  if (fields.length !== TSV_FIELD_COUNT) {
    throw new Error(
      `Строка ${lineNumber}: ожидалось ${TSV_FIELD_COUNT} полей, получено ${fields.length}.`,
    );
  }

  const [
    title,
    description,
    publicationDate,
    cityNameValue,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    housingType,
    roomCount,
    guestCount,
    rentPrice,
    amenities,
    authorName,
    authorEmail,
    authorAvatarPath,
    authorPassword,
    authorType,
    latitude,
    longitude,
  ] = fields;

  const cityName = parseEnum(cityNameValue, CITY_NAMES, 'Город');
  const userType = parseEnum(authorType, USER_TYPES, 'Тип пользователя');
  const propertyType = parseEnum(housingType, HOUSING_TYPES, 'Тип жилья');
  const parsedAmenities = amenities
    .split(';')
    .map((amenity) => parseEnum(amenity, AMENITIES, 'Удобства'));
  const author: User = {
    name: authorName,
    email: authorEmail,
    password: authorPassword,
    type: userType,
    ...(authorAvatarPath ? {avatarPath: authorAvatarPath} : {}),
  };

  return {
    title,
    description,
    publicationDate: parseDate(publicationDate),
    city: {name: cityName, location: CITY_LOCATIONS[cityName]},
    previewImage,
    images: images.split(';'),
    isPremium: parseBoolean(isPremium),
    isFavorite: parseBoolean(isFavorite),
    rating: parseNumber(rating, 'Рейтинг'),
    housingType: propertyType,
    roomCount: parseNumber(roomCount, 'Количество комнат'),
    guestCount: parseNumber(guestCount, 'Количество гостей'),
    rentPrice: parseNumber(rentPrice, 'Стоимость аренды'),
    amenities: parsedAmenities,
    author,
    commentCount: 0,
    location: {
      latitude: parseNumber(latitude, 'Широта'),
      longitude: parseNumber(longitude, 'Долгота'),
    },
  };
}

export class TsvFileReader {
  constructor(private readonly filepath: string) {}

  public async read(): Promise<number> {
    const stream = createReadStream(this.filepath, {encoding: 'utf-8'});
    const lines = createInterface({input: stream, crlfDelay: Infinity});
    let importedCount = 0;
    let lineNumber = 0;

    for await (const line of lines) {
      lineNumber++;

      if (line.trim().length === 0) {
        continue;
      }

      parseOffer(line, lineNumber);
      importedCount++;
    }

    return importedCount;
  }
}
