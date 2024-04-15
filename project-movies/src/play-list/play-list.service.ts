import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayListDto } from './dto/create-play-list.dto';
import { UpdatePlayListDto } from './dto/update-play-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayList, PlayListDocument } from './play-list.schema';
import { ERROR_MESSAGE } from '../helpers/constants';

@Injectable()
export class PlayListService {
  constructor(
    @InjectModel(PlayList.name) private playListModel: Model<PlayListDocument>,
  ) {}
  async create(createPlayListDto: CreatePlayListDto) {
    createPlayListDto.movies = Array.from(new Set(createPlayListDto.movies));
    const createList = new this.playListModel(createPlayListDto);
    return createList.save();
  }

  findAll() {
    return this.playListModel.find().exec();
  }

  async findPublicPlaylist() {
    return this.playListModel
      .find({ isPrivate: false })
      .populate('movies', 'title');
  }

  async findOne(id: string) {
    const playlist = await this.playListModel
      .findById(id)
      .populate('owner')
      .exec();
    if (!playlist)
      throw new NotFoundException(ERROR_MESSAGE.ERROR_PLAY_LIST_EXIST);
    return playlist;
  }

  async findTopPlaylists() {
    return this.playListModel
      .find()
      .sort({ entriesCount: -1 })
      .limit(50)
      .exec();
  }

  async update(id: string, updatePlayListDto: UpdatePlayListDto) {
    console.log(updatePlayListDto.movies);
    updatePlayListDto.movies = Array.from(new Set(updatePlayListDto.movies));
    console.log(updatePlayListDto.movies);
    const updateList = await this.playListModel
      .findByIdAndUpdate(id, updatePlayListDto, { new: true })
      .exec();
    if (!updateList) {
      throw new NotFoundException(ERROR_MESSAGE.PLAY_LIST_ID);
    }
    updateList.set(updatePlayListDto);
    return updateList.save();
  }

  async remove(id: string) {
    const deletePlayList = await this.playListModel.findByIdAndDelete(id);
    if (!deletePlayList) {
      throw new NotFoundException(ERROR_MESSAGE.PLAY_LIST_ID);
    }
    return deletePlayList;
  }

  async changeCount(playListId: string, increment: number) {
    this.playListModel
      .findByIdAndUpdate(
        playListId,
        { $inc: { entriesCount: increment } },
        { new: true },
      )
      .exec();
  }

  async deletePlayListByName(name: string) {
    return await this.playListModel.deleteMany({ name });
  }
}
