import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { AuthUserController } from '../user/auth/auth-user.controller';
import { User, UserSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from '../user/auth/auth-user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { DB_CONNECTION_URL } from '../helpers/config';

describe('MovieController', () => {
  let controller: MovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([
          { name: Movie.name, schema: MovieSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      controllers: [MovieController, AuthUserController],
      providers: [
        MovieService,
        UserService,
        AuthService,
        JwtService,
        ConfigService,
        MailService,
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
