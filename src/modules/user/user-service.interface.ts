import type {User} from '../../types/index.js';
import type {UserDocument} from './user.model.js';

export interface UserService {
  findById(id: string): Promise<UserDocument | null>;
  findByEmail(email: string): Promise<UserDocument | null>;
  create(data: User): Promise<UserDocument>;
}
