import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './report.schema';
import { Movie, MovieSchema } from 'src/movie/movie.schema';
import { PlayList, PlayListSchema } from '../play-list/play-list.schema';
import { User, UserSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from '../user/auth/auth-user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: PlayList.name, schema: PlayListSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ReportsController],
  providers: [
    ReportsService,
    UserService,
    AuthService,
    JwtService,
    ConfigService,
    MailService,
  ],
})
export class ReportModule {}
