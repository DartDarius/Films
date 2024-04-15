import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './director.schema';
import { AuthService } from '../user/auth/auth-user.service';
import { AuthUserController } from '../user/auth/auth-user.controller';
import { User, UserSchema } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
import { Movie, MovieSchema } from '../movie/movie.schema';
import { MovieService } from '../movie/movie.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Director.name, schema: DirectorSchema },
      { name: User.name, schema: UserSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
  ],
  controllers: [DirectorController, AuthUserController],
  providers: [
    DirectorService,
    UserService,
    JwtService,
    ConfigService,
    AuthService,
    MailService,
    MovieService,
  ],
})
export class DirectorModule {}
