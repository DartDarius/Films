import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre, GenreDocument } from './genre.schema';
import { ERROR_MESSAGE } from '../helpers/constants';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {}
  async create(createGenreDto: CreateGenreDto, auth: string) {
    const { name } = createGenreDto;
    const existingGenre = await this.genreModel.findOne({ name });
    if (existingGenre) {
      throw new ConflictException(ERROR_MESSAGE.GENRE_EXISTING);
    }
    const createGenre = new this.genreModel(createGenreDto, auth);
    return createGenre.save();
  }

  findAll() {
    return this.genreModel.find().exec();
  }

  findOne(id: string) {
    return this.genreModel.findById(id).exec();
  }

  async update(id: string, updateGenreDto: UpdateGenreDto, auth: string) {
    const updateGenre = await this.genreModel.findByIdAndUpdate(id);
    const admin = new this.genreModel(updateGenre, auth);
    if (!admin) {
      throw new NotFoundException(ERROR_MESSAGE.GENRE_ID);
    }
    admin.set(updateGenreDto);
    return admin.save();
  }

  async remove(id: string, auth: string) {
    const deleteGenre = await this.genreModel.findByIdAndDelete(id);
    const admin = new this.genreModel(deleteGenre, auth);
    if (!admin) {
      throw new NotFoundException(ERROR_MESSAGE.USER_ACCESS);
    }
    return admin;
  }

  async deleteUserByName(name: string) {
    return await this.genreModel.deleteMany({ name });
  }
}
