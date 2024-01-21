import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { User } from './schemas/user.schema';
import { GetAllUsersDto } from './dto/get-all-user.dto';
import { GetUserAvailibilityDto } from './dto/get-user-availibility.dto';
import { WeekDayslist } from './constants/constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async getAllUsers(getAllUsersDto: GetAllUsersDto): Promise<IUser[]> {
    const sortBy = getAllUsersDto?.sortBy ?? 'name';
    const sortOrder = getAllUsersDto?.order === 'desc' ? -1 : 1;
    const page: number = getAllUsersDto?.page
      ? Number(getAllUsersDto?.page)
      : 0;
    const limit: number = getAllUsersDto?.limit
      ? Number(getAllUsersDto?.limit)
      : 10;
    const skipData: number = page * limit;

    const userData = await this.userModel.aggregate([
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            {
              $match: {
                $or: [
                  { name: { $regex: getAllUsersDto?.search ?? '' } },
                  {
                    'userMembership.membershipType': {
                      $regex: getAllUsersDto?.search ?? '',
                    },
                  },
                ],
              },
            },
            { $sort: { [sortBy]: sortOrder } },
            { $project: { userMembership: { _id: 0 } } },
            { $skip: skipData },
            { $limit: limit },
          ],
        },
      },
    ]);

    return userData;
  }

  async getUserAvailibility(
    getUserAvailibilityDto: GetUserAvailibilityDto,
  ): Promise<IUser[]> {
    const availibilityDaysCheck = getUserAvailibilityDto?.availibilityDays
      ? getUserAvailibilityDto?.availibilityDays.split(',')
      : WeekDayslist;

    const userAvailibilityData = await this.userModel.aggregate([
      {
        $unwind: '$userMembership.availibilityDays',
      },
      {
        $match: {
          'userMembership.availibilityDays': { $in: availibilityDaysCheck },
        },
      },
      {
        $group: {
          _id: '$userMembership.availibilityDays',
          totalUsers: { $sum: 1 },
          user: { $push: '$name' },
        },
      },
      { $addFields: { availibilityDay: '$_id' } },
      { $project: { _id: 0 } },
      { $sort: { totalUsers: -1 } },
    ]);

    return userAvailibilityData;
  }
}
