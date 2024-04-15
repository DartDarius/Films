import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './genre.schema';
import { AuthService } from '../user/auth/auth-user.service';
import { AuthUserController } from '../user/auth/auth-user.controller';
import { User, UserSchema } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Genre.name, schema: GenreSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [GenreController, AuthUserController],
  providers: [
    GenreService,
    UserService,
    JwtService,
    ConfigService,
    AuthService,
    MailService,
  ],
})
export class GenreModule {}
