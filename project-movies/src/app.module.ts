import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { DirectorModule } from './director/director.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './user/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './user/auth/guards/jwt.guards';
import { PlayListModule } from './play-list/play-list.module';
import { ReportModule } from './reports/reports.module';
import { MailModule } from './mail/mail.module';
import { RolesGuard } from './user/auth/guards/roles.guard';
import { DB_CONNECTION_URL } from './helpers/config';
import { MediaModule } from './media/media.module';

const globalGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
};

const rolesGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

@Module({
  imports: [
    AuthModule,
    MovieModule,
    MongooseModule.forRoot(DB_CONNECTION_URL),
    DirectorModule,
    GenreModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PlayListModule,
    ReportModule,
    MailModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService, globalGuard, rolesGuard],
})
export class AppModule {}
