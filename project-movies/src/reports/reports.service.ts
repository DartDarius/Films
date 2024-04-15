import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from './report.schema';
import { CreateReportDto } from './dto/create-report.dto';
import { Movie, MovieDocument } from '../movie/movie.schema';
import { User, UserDocument } from '../user/user.schema';
import { PlayList, PlayListDocument } from '../play-list/play-list.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(PlayList.name) private playListModel: Model<PlayListDocument>,
  ) {}

  create(createReportDto: CreateReportDto) {
    return this.reportModel.create(createReportDto);
  }

  async generateReport(): Promise<Report> {
    const countMovies = await this.movieModel.countDocuments();
    const countPlayLists = await this.playListModel.countDocuments();
    const countUsers = await this.userModel.countDocuments();
    return {
      countMovies,
      countPlayLists,
      countUsers,
    };
  }
}
