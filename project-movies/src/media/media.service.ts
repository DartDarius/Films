import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media, MediaDocument } from './media.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ERROR_MESSAGE } from '../helpers/constants';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
  ) {}
  async create(createMediaDto: CreateMediaDto, auth: string) {
    const createdMedia = new this.mediaModel(createMediaDto, auth);
    return createdMedia.save();
  }

  findAll() {
    return this.mediaModel.find().exec();
  }

  findOne(id: string) {
    return this.mediaModel.findById(id).exec();
  }

  async update(id: string, updateMediaDto: UpdateMediaDto, auth: string) {
    const updatedMedia = await this.mediaModel.findByIdAndUpdate(id);
    const authen = new this.mediaModel(updatedMedia, auth, { new: true });
    if (!authen) {
      throw new NotFoundException(ERROR_MESSAGE.ERROR_MEDIA_ID);
    }
    authen.set(updateMediaDto);
    return authen.save();
  }

  async remove(id: string, auth: string) {
    const deleteMedia = await this.mediaModel.findByIdAndDelete(id);
    const authen = new this.mediaModel(deleteMedia, auth);
    if (!authen) {
      throw new NotFoundException(ERROR_MESSAGE.USER_ACCESS);
    }
    return authen;
  }

  async removeMediaByTitle(title: string) {
    return await this.mediaModel.deleteMany({ title });
  }
}
