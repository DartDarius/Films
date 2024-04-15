import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { randomMovieTitle } from '.././fixtures/movie.fixtures';
import { DB_CONNECTION_URL } from '../helpers/config';
import { TEST_VAlUES } from '../fixtures/testValues';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
      ],
      providers: [MovieService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should created a movie', async () => {
    const auth = TEST_VAlUES.TOKEN;
    const createMovieDto = {
      title: randomMovieTitle,
      year: 2011,
      cast: [TEST_VAlUES.SOME_CAST],
      duration: 90,
      director: [TEST_VAlUES.ID_DIRECTOR],
    };
    const createdMovie = await service.create(createMovieDto, auth);
    expect(createdMovie.title).toBeDefined();
    expect(createdMovie.year).toBeDefined();
    expect(createdMovie.cast).toBeDefined();
    expect(createdMovie.duration).toBeDefined();
    expect(createdMovie.director).toBeDefined();
  });

  afterEach(async () => {
    await service.deleteMovieByName(randomMovieTitle);
  });

  it('should return all movies', async () => {
    const movies = await service.findAll();
    expect(movies).toBeInstanceOf(Array);
  });
});
