import {inject, injectable} from 'inversify';
import type {User} from '../../types/index.js';
import {Component} from '../../shared/types/component.js';
import type {UserDocument, UserModelType} from './user.model.js';
import type {UserService} from './user-service.interface.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.UserModel) private readonly userModel: UserModelType,
  ) {}

  public async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({email}).exec();
  }

  public async create(data: User): Promise<UserDocument> {
    return this.userModel.create(data);
  }
}
