import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { Genre, GenreSchema } from '../genre/genre.schema';
import { Director, DirectorSchema } from '../director/director.schema';
import { User, UserSchema } from '../user/user.schema';
import { AuthService } from '../user/auth/auth-user.service';
import { AuthUserController } from '../user/auth/auth-user.controller';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: Genre.name, schema: GenreSchema },
      { name: Director.name, schema: DirectorSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [MovieController, UserController, AuthUserController],
  providers: [
    MovieService,
    AuthService,
    UserService,
    JwtService,
    ConfigService,
    MailService,
  ],
})
export class MovieModule {}
