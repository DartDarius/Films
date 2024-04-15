import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Director, DirectorDocument } from './director.schema';
import { ERROR_MESSAGE } from '../helpers/constants';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director.name) private directorModel: Model<DirectorDocument>,
  ) {}
  async create(
    createDirectorDto: CreateDirectorDto,
    auth: string,
  ): Promise<Director> {
    const createDirector = new this.directorModel(createDirectorDto, auth);
    return createDirector.save();
  }

  findAll(): Promise<Director[]> {
    return this.directorModel.find().exec();
  }

  findOne(id: string) {
    return this.directorModel.findById(id).exec();
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto, auth: string) {
    const updateDirector = await this.directorModel.findByIdAndUpdate(id);
    const admin = new this.directorModel(updateDirector, auth, { new: true });
    admin.set(updateDirectorDto);
    return admin.save();
  }

  async remove(
    id: string,
    auth: string,
    session: mongoose.mongo.ClientSession,
  ) {
    const deleteDirector = await this.directorModel.findByIdAndDelete(id, {
      session,
      new: true,
    });
    const authen = new this.directorModel(deleteDirector, auth);
    if (!authen) {
      throw new NotFoundException(ERROR_MESSAGE.USER_ACCESS);
    }
    return authen;
  }

  async deleteDirectorByName(name: string) {
    return await this.directorModel.deleteMany({ name });
  }
}
