import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { ERROR_MESSAGE } from '../helpers/constants';
import { EnumFileTypes } from '../modulesForExport/typesOfFormat';
import { FileWriter } from '../modulesForExport/typeFile';
import * as path from 'path';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const existingEmail = await this.userModel.findOne({ email });
    if (existingEmail) {
      throw new ConflictException(ERROR_MESSAGE.USER_EMAIL_EXIST);
    }
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async generateFile(type: EnumFileTypes, users: any[]): Promise<string> {
    const fileWriter = new FileWriter(type, users);
    await fileWriter.writeFile();
    const filePath = path.join(__dirname, '../../', `data.${type}`);
    return filePath;
  }

  async findOne(id: string, auth: string) {
    const user = await this.userModel.findById(id).exec();
    const admin = new this.userModel(user, auth);
    return admin;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  async update(
    id: string | number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async addPlaylistToUser(userId: string, playListId: string) {
    console.log(userId);
    await this.userModel.findByIdAndUpdate(
      { _id: userId },
      {
        $addToSet: { playList: playListId },
      },
      {
        new: true,
      },
    );
  }

  async deletePlaylistFromUser(userId: string, playListId: string) {
    await this.userModel.findByIdAndUpdate(
      { _id: userId },
      { $pull: { playList: playListId } },
      {
        new: true,
      },
    );
  }

  async deleteUserByName(nickName: string) {
    return await this.userModel.deleteMany({ nickName });
  }
}
