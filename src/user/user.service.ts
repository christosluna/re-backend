import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserDocument } from './schemas/User.schema';
import { UserDetails } from './interface/user-default.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.isAgent == false ? 'client' : 'agent',
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(_id: string): Promise<UserDetails | null> {
    const user = this.userModel.findOne({ _id }).exec();
    if (!user) return null;
    return this._getUserDetails(await user);
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      isAgent: false,
    });
    return newUser.save();
  }
}
