import type {User} from '../../types/index.js';

export interface UserEntity extends User {
  createdAt: Date;
  updatedAt: Date;
}
