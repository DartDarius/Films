import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument, MovieTitle } from './movie.schema';
import { ERROR_MESSAGE } from '../helpers/constants';
import * as NodeCache from 'node-cache';
import { CACHE } from '../helpers/constants';
import { EnumFileTypes } from '../modulesForExport/typesOfFormat';
import { FileWriter } from '../modulesForExport/typeFile';
import * as path from 'path';

@Injectable()
export class MovieService {
  private cache;
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {
    this.cache = new NodeCache({
      stdTTL: CACHE.SECONDS,
      checkperiod: CACHE.PERIODS,
    });
  }
  async create(createMovieDto: CreateMovieDto, auth: string): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovieDto, auth);
    return createdMovie.save();
  }

  getAllMovies(): Promise<Movie[]> {
    return this.movieModel.find();
  }

  async generateFile(type: EnumFileTypes, movies: any[]): Promise<string> {
    const fileWriter = new FileWriter(type, movies);
    await fileWriter.writeFile();
    const filePath = path.join(__dirname, '../../', `data.${type}`);
    return filePath;
  }

  async findMovieName(): Promise<MovieTitle[]> {
    const movies = await this.movieModel.find().select('title').exec();
    return movies.map((movie) => ({ title: movie.title }));
  }

  async findAll(): Promise<Movie[]> {
    const cacheKey = CACHE.KEY;
    const cachedMovies = this.cache.get(cacheKey);
    if (cachedMovies) return cachedMovies as Movie[];
    const allMovies = await this.movieModel.find().exec();
    this.cache.set(cacheKey, allMovies);
    return allMovies;
  }

  findOne(id: string) {
    return this.movieModel.findById(id).exec();
  }

  async update(id: string, updateMovieDto: UpdateMovieDto, auth: string) {
    const updateMovie = await this.movieModel.findByIdAndUpdate(id);
    const authen = new this.movieModel(updateMovie, auth, { new: true });
    if (!authen) {
      throw new NotFoundException(ERROR_MESSAGE.MOVIE_ID);
    }
    authen.set(updateMovieDto);
    return authen.save();
  }

  async remove(id: string, auth: string) {
    const deletedMovie = await this.movieModel.findByIdAndDelete(id);
    const authen = new this.movieModel(deletedMovie, auth);
    if (!authen) {
      throw new NotFoundException(ERROR_MESSAGE.USER_ACCESS);
    }
    return authen;
  }

  async removeDirectorFromMovie(
    _id: string,
    session: mongoose.mongo.ClientSession,
  ) {
    const director = await this.movieModel.updateMany(
      { director: _id },
      { $pull: { director: _id } },
      { session, new: true },
    );
    return director;
  }

  async resetCache() {
    const cacheKey = CACHE.KEY;
    this.cache.del(cacheKey);
  }

  async deleteMovieByName(title: string) {
    return await this.movieModel.deleteMany({ title });
  }
}
