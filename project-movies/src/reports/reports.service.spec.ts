import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { Report, ReportSchema } from '../reports/report.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';
import { PlayListService } from '../play-list/play-list.service';
import { Movie, MovieSchema } from '../movie/movie.schema';
import { PlayList, PlayListSchema } from '../play-list/play-list.schema';
import { User, UserSchema } from '../user/user.schema';
import { DB_CONNECTION_URL } from '../helpers/config';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([
          { name: Report.name, schema: ReportSchema },
          { name: PlayList.name, schema: PlayListSchema },
          { name: Movie.name, schema: MovieSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [ReportsService, MovieService, PlayListService, UserService],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
