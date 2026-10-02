import type {CityName} from './city.type.js';
import type {Amenity} from './amenity.type.js';
import type {User} from './user.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: CityName[];
  previewImages: string[];
  images: string[];
  amenities: Amenity[];
  users: User[];
};
