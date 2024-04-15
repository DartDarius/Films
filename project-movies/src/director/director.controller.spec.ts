import { Test, TestingModule } from '@nestjs/testing';
import { DirectorController } from './director.controller';
import { DirectorService } from './director.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './director.schema';
import { User, UserSchema } from '../user/user.schema';
import { MovieService } from '../movie/movie.service';
import { Movie, MovieSchema } from '../movie/movie.schema';
import { DB_CONNECTION_URL } from '../helpers/config';

describe('DirectorController', () => {
  let controller: DirectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([
          { name: Director.name, schema: DirectorSchema },
          { name: User.name, schema: UserSchema },
          { name: Movie.name, schema: MovieSchema },
        ]),
      ],
      controllers: [DirectorController],
      providers: [DirectorService, MovieService],
    }).compile();

    controller = module.get<DirectorController>(DirectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
