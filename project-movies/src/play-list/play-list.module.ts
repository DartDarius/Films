import { Module } from '@nestjs/common';
import { PlayListService } from './play-list.service';
import { PlayListController } from './play-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayList, PlayListSchema } from './play-list.schema';
import { Movie, MovieSchema } from '../movie/movie.schema';
import { User, UserSchema } from '../user/user.schema';
import { MovieController } from '../movie/movie.controller';
import { UserController } from '../user/user.controller';
import { MovieService } from '../movie/movie.service';
import { AuthService } from '../user/auth/auth-user.service';
import { AuthUserController } from '../user/auth/auth-user.controller';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlayList.name, schema: PlayListSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    PlayListController,
    MovieController,
    UserController,
    AuthUserController,
  ],
  providers: [
    PlayListService,
    MovieService,
    UserService,
    AuthService,
    JwtService,
    ConfigService,
    MailService,
  ],
})
export class PlayListModule {}
