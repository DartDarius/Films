import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from './genre.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './genre.schema';
import { defaultGenreName } from '.././fixtures/genre.fixtures';
import { DB_CONNECTION_URL } from '../helpers/config';

describe('GenreService', () => {
  let service: GenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
      ],
      providers: [GenreService],
    }).compile();

    service = module.get<GenreService>(GenreService);
  });

  it('should cerated a genre', async () => {
    const auth = 'alskdlskadm';
    const createGenreDto = {
      name: defaultGenreName,
    };
    const createGenre = await service.create(createGenreDto, auth);
    expect(createGenre).toBeDefined();
  });

  afterEach(async () => {
    await service.deleteUserByName(defaultGenreName);
  });

  it('should return all genres', async () => {
    const genres = await service.findAll();
    expect(genres).toBeInstanceOf(Array);
  });
});
